import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Quiz from "../_components/Quiz";

const MockInterview = () => {
  return (
    <div className="container mx-auto space-y-4 py-6">
      <div className="flex flex-col space-y-2">
        <Link href={"/interview"}>
          <Button className="gap-2 pl-3" variant={"secondary"}>
            Back to Interview Page
          </Button>
        </Link>

        <div className="mt-2">
          <h1 className="text-6xl gradient-title font-bold">Mock Interview</h1>
          <p className="text-muted-foreground">
            Test your skills required for interview prep
          </p>
        </div>
      </div>

      <Quiz />
    </div>
  );
};

export default MockInterview;
