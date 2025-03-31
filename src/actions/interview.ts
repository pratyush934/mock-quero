"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type Questions = {
  question: string;
  options: string[];
  correctAnswer: string;
  explaination: string;
};

export async function generateQuiz() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) {
    throw new Error("there is an error while getting all the stuff");
  }

  const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleanedText);
    return quiz.questions;
  } catch (e) {
    console.log("There is an error in interview.ts", e);
    throw new Error("There is an issue in generateQuiz , please look to it")
  }
}


export async function saveQuizResult(questions : Questions, answers : string, score : number) {
    console.log(questions);
    console.log(answers);
    console.log(score);
}