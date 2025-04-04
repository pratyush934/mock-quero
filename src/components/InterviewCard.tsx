import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";
import { Feedback, InterviewCardProps } from "@/types/index.types";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  // console.log(feedback);
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div>
      <div className="card-border w-[360px] max-sm:w-full min-h-96">
        <div className="card-interview">
          <div>
            <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-400">
              <p className="badge-text">{normalizedType}</p>
            </div>
            <Image
              src={getRandomInterviewCover()}
              alt="kuch nahi"
              height={90}
              width={90}
              className="rounded-full object-fit size=[90px]"
            />

            <h3 className="mt-5 capitalize">{role} Interview</h3>
            <div className="flex felx-row gap-5 mt-3">
              <div className="flex felx-row gap-2">
                <Image
                  src={"/calendar.svg"}
                  alt="calendar"
                  width={22}
                  height={22}
                />
                <p>{formattedDate}</p>
                <div className="flex flex-row gap-2">
                  <Image src={"/star.svg"} alt="start" width={22} height={22} />
                  <p>{feedback?.totalScore || "---"}/100</p>
                </div>
              </div>
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken the interview yet. Take it now to improve"}
          </p>
        </div>
        <div className="flex flex-row justify-between mt-2">
          <DisplayTechIcons techstack={techstack} />
          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/mock/interview/${interviewId}/feedback`
                  : `/mock/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
