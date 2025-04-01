import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Assessments } from "@/types/user-type";
import { Brain, Target, Trophy } from "lucide-react";
import React from "react";

export const QuizStats = ({ assessments }: { assessments: Assessments[] }) => {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;

    const totalSum = assessments.reduce((sum, ass) => sum + ass.quizScore, 0);

    return totalSum / assessments.length;
  };

  const getLatestAssessment = () => {
    if (assessments?.length > 0) {
      return assessments[0];
    } else {
      return null;
    }
  };

  const totalQuestionPractice = () => {
    if (!assessments?.length) return 0;

    return assessments.reduce((sum, ass) => sum + ass.questions.length, 0);
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAverageScore()}%</div>
            <p className="text-xs text-muted-foreground">
              Across all assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Questions Practiced
            </CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuestionPractice()}</div>
            <p className="text-xs text-muted-foreground">Total questions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
            </div>
            <p className="text-xs text-muted-foreground">Most recent quiz</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
