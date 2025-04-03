import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    question:
      "What is MockQuero, and how does it help with interview preparation?",
    answer:
      "MockQuero is an AI-powered platform designed to help you excel in your interviews. It offers personalized mock interviews, real-time feedback, and tailored interview questions based on your role, experience level, and skills. Our goal is to make you confident and prepared for any interview scenario.",
  },
  {
    question: "How does MockQuero generate personalized interview questions?",
    answer:
      "MockQuero uses advanced AI algorithms to analyze your job role, experience level, and technical skills. Based on this information, it generates customized interview questions that simulate real-world scenarios, ensuring you're prepared for both technical and behavioral aspects of the interview.",
  },
  {
    question: "Can MockQuero provide feedback on my interview performance?",
    answer:
      "Yes! MockQuero provides detailed, AI-driven feedback after each mock interview. You'll receive insights on your strengths, areas for improvement, and actionable tips to enhance your performance. This feedback is designed to help you continuously improve and build confidence.",
  },
  {
    question: "Is my data secure with MockQuero?",
    answer:
      "Absolutely. MockQuero prioritizes the security of your personal and professional information. All data is encrypted and securely stored using industry-standard practices. We use trusted authentication providers like Clerk and never share your data with third parties.",
  },
  {
    question: "Can I customize the AI-generated interview questions?",
    answer:
      "Yes! While MockQuero generates high-quality, tailored questions, you have the flexibility to customize them. You can add, edit, or remove questions to better align with your specific needs or preferences.",
  },
  {
    question: "How does MockQuero track my interview preparation progress?",
    answer:
      "MockQuero tracks your performance across multiple mock interviews and provides detailed analytics. You can view your progress over time, identify areas for improvement, and receive AI-generated suggestions to refine your skills and boost your confidence.",
  },
];

const FAQs = () => {
  return (
    <section className="w-full bg-gray-100 dark:bg-black py-20">
      {/* Heading */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Frequently Asked Questions
        </h2>

        {/* Accordion Section */}
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQs;
