"use server";

import prisma from "@/lib/db";
import { userType, ValueType } from "@/types/user-type";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { generateAllInsights } from "./dashboard";

export async function updateUser(data: userType | ValueType) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) throw new Error("not available");

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        // Check if industry exists using proper array query
        let isIndustryExist = await tx.industryInsight.findFirst({
          where: {
            industry: {
              has: data.industry || "",
            },
          },
        });

        if (!isIndustryExist) {

          const insights = await generateAllInsights(data.industry as string)

          isIndustryExist = await tx.industryInsight.create({
            data: {
              industry: data.industry ? [data.industry] : [],
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
              // growthRate: 0,
              // demandLevel: "MEDIUM", 
              // topSkills: [],
              // marketOutlook: "NEUTRAL", 
              // keyTrends: [],
              // recommendedSkills: [],
              // salaryRanges: [],
              ...insights
            },
          });

          if (!isIndustryExist) {
            console.log("there is some error exist in isIndustryExist");
          }
        }

        const updateUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry, // Fixed typo from "indurstry" to "industry"
            skills: data.skills,
            experience: data.experience,
            bio: data.bio,
          },
        });

        return { updateUser, isIndustryExist };
      },
      {
        timeout: 10000, // 10 seconds instead of 1 second
      }
    );

    revalidateTag("/");
    return result.updateUser;
  } catch (e) {
    console.log("There is an error in updateUser", e);
    throw e; // Re-throw the error to handle it in the calling function
  }
}




export async function onBoardingStatus() {
  const { userId } = await auth();

  if (!userId) {
    console.log(
      "There is a lot of issue while getting userId from auth in action/user.ts"
    );
    throw new Error("There is issue here in onBoaringStatus");
  }

  try {
    const getUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!getUser) {
      console.log("We didn't get the user with such clerkId");
    }

    const getUserForIndustry = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnBorded: !!getUserForIndustry?.industry,
    };
  } catch (e) {
    console.log(
      "There is still an issue in onBoardingStatus method in catch section",
      e
    );
    throw e;
  }
}
