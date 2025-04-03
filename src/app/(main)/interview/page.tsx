import { getAssessment } from "@/actions/interview";
import { Assessments } from "@/types/user-type";
import PerformanceChart from "./_components/PerformanceChart";
import QuizList from "./_components/QuizList";
import { QuizStats } from "./_components/QuizStats";

const InterviewPage = async () => {
    
  const rawAssessments = await getAssessment();
  const assessments: Assessments[] = rawAssessments.map((assessment) => ({
    ...assessment,
    questions: assessment.questions.map((question: any) => ({
      question: question.question || "",
      options: question.options || [],
      correctAnswer: question.correctAnswer || "",
      explanation: question.explanation || undefined,
      isCorrect: question.isCorrect || undefined,
      userAnswer: question.userAnswer || "",
      answer: question.answer || "",
    })),
  }));

  /*  
const assessments: {
    userId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    quizScore: number;
    questions: JsonValue[];
    category: string | null;
    improvementTips: string | null;
}[]
    */

  return (
    <div>
      <div className="flex justify-center items-center mb-5">
        <h1 className="text-6xl font-bold grandient-title">Interview Page</h1>
      </div>

      <div className="space-y-6">
        <QuizStats assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
};

export default InterviewPage;
