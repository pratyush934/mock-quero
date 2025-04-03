import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const MockInterview = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-6">
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="gradient-title text-lg">
            Get Interview Ready with MockQuero
          </h2>
          <p className="text-lg">
            Practice Real Interview questions and get instant feedback
          </p>
          <Button className="btn-primary" asChild>
            <Link href={"/mock/interview"}>Start an interview</Link>
          </Button>
        </div>
        <Image
          src={"/robot.png"}
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MockInterview;
