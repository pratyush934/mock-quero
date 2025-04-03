import { getResume } from "@/actions/resume";
import React from "react";
import ResumeBuilder from "./_components/ResumeBuilder";

const ResumePage = async () => {
  const data = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={data?.content || ""}/>
    </div>
  );
};

export default ResumePage;
