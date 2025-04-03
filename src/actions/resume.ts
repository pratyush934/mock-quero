"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(content: string) {
  const { userId } = await auth();

  if (!userId)
    throw new Error("Unauthroized , can't find userId in saveResume");

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) throw new Error("There is an issue as we didn't get the user");

  try {
    const resume = await prisma.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content: content,
      },
      create: {
        userId: user.id,
        content: content,
      },
    });

    if (!resume)
      throw new Error("There is an issue as we are not getting resum");

    revalidatePath("/resume");
    return resume;
  } catch (e) {
    console.log("Error is there in saveResume", e);
    throw new Error("Unauthorized assess");
  }
}

export async function getResume() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized, can't get the userId in saveResume");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) throw new Error("Not getting any type of user");

  try {
    const resume = await prisma.resume.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!resume) throw new Error("Didn't build the resume");
    return resume;
  } catch (e) {
    console.log("There is an error in getResume(), ", e);
    // throw new Error("There is an issue while getting the resume");
  }
}

export async function improveWithAI({ content, type }: { content: string }) {
  const { userId } = await auth();

  if (!userId) throw new Error("Issue with userId");

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      IndustryInsight: true,
    },
  });

  console.log("This one is user, ---------->", type);

  if (!user) throw new Error("Not getting user");

  const prompt = `
  As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
  Make it more impactful, quantifiable, and aligned with industry standards.
  Current content: "${content}"

  Requirements:
  1. Use action verbs
  2. Include metrics and results where possible
  3. Highlight relevant technical skills
  4. Keep it concise but detailed
  5. Focus on achievements over responsibilities
  6. Use industry-specific keywords
  
  Format the response as a single paragraph without any additional text or explanations.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text().trim();
    return response;
  } catch (E) {
    console.log("There is an issue in in", E);
    throw new Error("There is an error in it");
  }
}
