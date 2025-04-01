"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type Questions = {
  question: string;
  options?: string[];
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
      "questions": [=
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
    throw new Error("There is an issue in generateQuiz , please look to it");
  }
}

export async function saveQuizResult(
  questions: Questions[],
  answers: string[],
  score: number
) {
  const { userId } = await auth();

  if (!userId) throw new Error("Author is unauthorized");

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!userId) throw new Error("User is not available");

  const questionResult = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explaination: q.explaination,
  }));

  const wrongAnswers = questionResult.filter((q) => !q.isCorrect);

  let improvementTips = null;

  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const goodIndustry = user?.industry || "Amazon";

    const improvementPrompt = `
      The user got the following ${goodIndustry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);

      improvementTips = tipResult.response.text().trim();
      console.log(improvementTips);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
  }
  if (!Array.isArray(questionResult) || questionResult.length === 0) {
    throw new Error("Invalid question result data");
  }

  try {
    const createAssement = await prisma.assessment.create({
      data: {
        userId: user?.id,
        quizScore: score,
        questions: questionResult,
        category: "Technical",
        improvementTips: improvementTips,
      },
    });
    return createAssement;
  } catch (e) {
    console.log("There is an error in saveQuizResult", e);
    throw new Error("There is an error ");
  }
}

export async function getAssessment() {
  const { userId } = await auth();

  if (!userId) throw new Error("User not authroized");

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const getAssessment = await prisma.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return getAssessment;
  } catch (e) {
    console.log(
      "Error exist while getting the getAssessment in getAssessment() interview.js",
      e
    );
    throw new Error("There is an error in this");
  }
}
