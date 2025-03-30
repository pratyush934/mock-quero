import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    question: "What makes Sensai unique as a career development tool?",
    answer:
      "Sensai combines AI-powered career tools with industry-specific insights to help you advance your career. Our platform offers three main features: an intelligent resume builder, a cover letter generator, and an adaptive interview preparation system. Each tool is tailored to your industry and skills, providing personalized guidance for your professional journey.",
  },
  {
    question: "How does Sensai create tailored content?",
    answer:
      "Sensai learns about your industry, experience, and skills during onboarding. It then uses this information to generate customized resumes, cover letters, and interview questions. The content is specifically aligned with your professional background and industry standards, making it highly relevant and effective.",
  },
  {
    question: "How accurate and up-to-date are Sensai's industry insights?",
    answer:
      "We update our industry insights weekly using advanced AI analysis of current market trends. This includes salary data, in-demand skills, and industry growth patterns. Our system constantly evolves to ensure you have the most relevant information for your career decisions.",
  },
  {
    question: "Is my data secure with Sensai?",
    answer:
      "Absolutely. We prioritize the security of your professional information. All data is encrypted and securely stored using industry-standard practices. We use Clerk for authentication and never share your personal information with third parties.",
  },
  {
    question: "How can I track my interview preparation progress?",
    answer:
      "Sensai tracks your performance across multiple practice interviews, providing detailed analytics and improvement suggestions. You can view your progress over time, identify areas for improvement, and receive AI-generated tips to enhance your interview skills based on your responses.",
  },
  {
    question: "Can I edit the AI-generated content?",
    answer:
      "Yes! While Sensai generates high-quality initial content, you have full control to edit and customize all generated resumes, cover letters, and other content. Our markdown editor makes it easy to refine the content to perfectly match your needs.",
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
