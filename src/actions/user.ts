"user server";

import prisma from "@/lib/db";
import { userType } from "@/types/user-type";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";
import { revalidateTag } from "next/cache";

export type PrismaTransactionalClient = Parameters<
  (args: Parameters<PrismaClient["$transaction"]>[0]) => any
>[0];

export async function updateUser(data : userType) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthroized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) throw new Error("not available");

  try {
    const result = await prisma.$transaction(
      async (tx: PrismaTransactionalClient) => {
        const isIndustryExist = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        if (!isIndustryExist) {
          const createIndustry = await prisma.industryInsight.create({
            data: {
              industry: data.industry,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 1000),
              growthRate: data.growthRate || 0, // Provide a default value or use data.growthRate
            //   demandLevel: data.demandLevel || "medium", // Provide a default value or use data.demandLevel
            //   marketOutlook: data.marketOutlook || "stable", // Provide a default value or use data.marketOutlook
            },
          });
          if (!createIndustry) {
            console.log("there is some error exist in creatingIndustry");
          }
        }
        const updateUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            indurstry: data.industry,
            skills: data.skills,
            experience: data.experience,
            bio: data.bio,
          },
        });
        return { updateUser, isIndustryExist };
      },
      {
        timeout: 1000,
      }
    );
    revalidateTag("/");
    return result.updateUser;
  } catch (e) {
    console.log("There is an error in updateUsser", e);
  }
}
