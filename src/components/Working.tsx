import React from "react";
import { howItWorks } from "@/data/howItWorks"; // Adjust the import path if needed

const Working = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 mt-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          How It Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
            >
              {/* Icon */}
              <div className="mb-4">{step.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Working;