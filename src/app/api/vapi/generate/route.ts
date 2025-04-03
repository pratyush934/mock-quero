import { db } from "@/firebase/admint";
import { getRandomInterviewCover } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Read the request body only once
    const body = await request.json();
    console.log("Request Body:", body);

    const { type, role, level, techstack, amount, userid } = body;

    console.log(
      "FIREBASE_PRIVATE_KEY exists:",
      !!process.env.FIREBASE_PRIVATE_KEY
    );
    console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);

    // Ensure userId is present
    if (!userid) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
              The job role is ${role}.
              The job experience level is ${level}.
              The tech stack used in the job is: ${techstack}.
              The focus between behavioural and technical questions should lean towards: ${type}.
              The amount of questions required is: ${amount}.
              Please return only the questions, without any additional text.
              The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
              Return the questions formatted like this:
              ["Question 1", "Question 2", "Question 3"]
              
              Thank you! <3
          `,
    });

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack?.split(",") || [],
      questions: JSON.parse(questions),
      userId: userid, // Ensure this is not undefined
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Error in route.ts api/vapi/generate:", e);
    return NextResponse.json(
      { success: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: true, message: "Thank you" });
}
