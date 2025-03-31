"use server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type IndustryInsights = {
  salaryRanges: {
    role: string;
    min: number;
    max: number;
    median: number;
    location: string;
  }[];
  growthRate: number;
  demandLevel: "HIGH" | "MEDIUM" | "LOW";
  topSkills: string[];
  marketOutlook: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  keyTrends: string[];
  recommendedSkills: string[];
};

export const generateAllInsights = async (
  industry: string | null
): Promise<IndustryInsights> => {
  // console.log(industry);

  const prompt = `
  Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
  {
    "salaryRanges": [
      { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
    ],
    "growthRate": number,
    "demandLevel": "HIGH" | "MEDIUM" | "LOW",
    "topSkills": ["skill1", "skill2"],
    "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
    "keyTrends": ["trend1", "trend2"],
    "recommendedSkills": ["skill1", "skill2"]
  }
  
  IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
  Include at least 5 common roles for salary ranges.
  Growth rate should be a percentage.
  Include at least 5 skills and trends.
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  try {
    const parsedInsights: IndustryInsights = JSON.parse(cleanedText);
    return parsedInsights;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Invalid AI response format");
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();

  if (!userId) {
    console.log(
      "The user is not logged in , we can't allow anyone without login"
    );
    throw new Error("Unauthorized");
  }

  try {
    const getUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        IndustryInsight: true,
      },
    });

    if (!getUser) {
      console.log("We didn't get the User and please add the user ");
      throw new Error("Not available");
    }

    if (!getUser.IndustryInsight) {
      const insights = await generateAllInsights(getUser.industry);

      if (!insights) {
        throw new Error("Failed to generate insights");
      }

      const settingInsights = await prisma.industryInsight.create({
        data: {
          industry: getUser.industry ? [getUser.industry] : [],
          salaryRanges: insights.salaryRanges,
          growthRate: insights.growthRate,
          demandLevel: insights.demandLevel,
          topSkills: insights.topSkills,
          marketOutlook: insights.marketOutlook,
          keyTrends: insights.keyTrends,
          recommendedSkills: insights.recommendedSkills,
          nextUpdate: new Date(Date.now() + 7 * 60 * 60 * 1000), // 7 hours from now
        },
      });
      return settingInsights;
    }
  } catch (e) {
    console.log(
      "There is an error and please look at this in action/dahsboard.ts",
      e
    );
    throw new Error("Error in dashboard.ts");
  }
}
