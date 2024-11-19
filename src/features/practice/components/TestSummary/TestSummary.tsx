// src/features/practice/components/TestSummary/TestSummary.tsx

import React from "react";
import { Trophy, RotateCcw, Book } from "lucide-react";

interface TestSummaryProps {
  score: number;
  totalQuestions: number;
  onRetakeTest: () => void;
  onConfigureNewTest: () => void;
}

const TestSummary: React.FC<TestSummaryProps> = ({
  score,
  totalQuestions,
  onRetakeTest,
  onConfigureNewTest,
}) => {
  const percentage = (score / totalQuestions) * 100;

  let performance = "Try Again";
  let performanceColor = "text-red-600";

  if (percentage >= 80) {
    performance = "Excellent!";
    performanceColor = "text-green-600";
  } else if (percentage >= 60) {
    performance = "Good Job!";
    performanceColor = "text-blue-600";
  } else if (percentage >= 40) {
    performance = "Keep Practicing";
    performanceColor = "text-yellow-600";
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Test Complete!
        </h2>

        <div className="mt-6">
          <div className={`text-4xl font-bold ${performanceColor}`}>
            {score}/{totalQuestions}
          </div>
          <div className="mt-2 text-gray-600">
            {percentage.toFixed(0)}% Correct
          </div>
          <div className={`mt-2 font-medium ${performanceColor}`}>
            {performance}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={onRetakeTest}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Take Similar Test
          </button>

          <button
            onClick={onConfigureNewTest}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Book className="w-5 h-5" />
            Configure New Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestSummary;
