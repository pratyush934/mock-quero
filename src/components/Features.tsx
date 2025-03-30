import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Features = () => {
  return (
    <div className="flex flex-col items-center px-4">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
        Unique Features of Our AI-Based Interview Preparation Application
      </h1>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {/* Card 1: Personalized Interview Questions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Personalized Questions</CardTitle>
            <CardDescription>
              Get AI-generated questions tailored to your job role and
              experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Our AI analyzes your profile and generates questions to simulate
              real interview scenarios.
            </p>
          </CardContent>
          <CardFooter>
            <p>Prepare smarter, not harder.</p>
          </CardFooter>
        </Card>

        {/* Card 2: Real-Time Feedback */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Real-Time Feedback</CardTitle>
            <CardDescription>
              Improve with instant AI-driven feedback on your answers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Identify strengths and weaknesses with detailed feedback on your
              responses.
            </p>
          </CardContent>
          <CardFooter>
            <p>Boost your confidence.</p>
          </CardFooter>
        </Card>

        {/* Card 3: Mock Interviews */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Mock Interviews</CardTitle>
            <CardDescription>
              Practice with realistic mock interview sessions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Simulate interviews with AI acting as the interviewer for various
              industries.
            </p>
          </CardContent>
          <CardFooter>
            <p>Be interview-ready.</p>
          </CardFooter>
        </Card>

        {/* Card 4: Progress Tracking */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Progress Tracking</CardTitle>
            <CardDescription>
              Monitor your improvement over time with detailed analytics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Track your performance and focus on areas that need improvement.
            </p>
          </CardContent>
          <CardFooter>
            <p>Achieve your goals.</p>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default Features;
