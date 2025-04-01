// export type userType = {
//   id: string;
//   clerkId: string;
//   email: string;
//   name: string;
//   imageUrl: string;
//   industry: string[];
//   updatedAt: Date;
//   createdAt: Date;
//   skills: string[];
//   bio: string;
//   experience: number;
//   growthRate: number;
//   demandLevel?: string;
//   marketOutlook?: string;
// };

export type userType = {
  id: string;
  clerkId: string;
  email: string;
  name?: string; // Optional, as per Prisma schema
  imageUrl?: string; // Optional, as per Prisma schema
  industry?: string; // Single optional string, matching Prisma schema
  updatedAt: Date;
  createdAt: Date;
  skills: string[]; // Array of strings, matching Prisma schema
  bio?: string; // Optional, as per Prisma schema
  experience: number;
  growthRate: number;
  demandLevel?: string; // Optional, as per your definition
  marketOutlook?: string; // Optional, as per your definition
  industryInsightId?: string; // Optional, matching the relation in Prisma schema
};

export type ValueType = {
  bio?: string;
  experience: number;
  skills?: string[];
  subIndustry: string;
  industry: string;
};

/* 

model User {
  id        String   @id @default(uuid())
  clerkId   String   @unique
  email     String   @unique
  name      String?
  imageUrl  String?
  indurstry String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  bio        String?
  experience Int

  skills            String[]
  Resume            Resume?
  Assessment        Assessment[]
  coverLetter       coverLetter[]
  IndustryInsight   IndustryInsight? @relation(fields: [industryInsightId], references: [id])
  industryInsightId String?
}
*/

export type QuizResultData = {
  id: string;
  userId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  quizScore: number;
  category: string;
  improvementTips: string;
  // isCorrect?: boolean
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
    isCorrect?: boolean;
    userAnswer: string;
    answer: string;
  }[];
};

export type Assessments = {
  userId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quizScore: number;
  category: string | null;
  improvementTips: string | null;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
    isCorrect?: boolean;
    userAnswer: string;
    answer: string;
  }[];
};
