// src/features/practice/components/PracticePage/PracticePage.tsx

import React, { useState } from "react";
import { TestConfig } from "../../types/practice.types";
import { usePracticeTest } from "../../hooks/usePracticeTest";
import ConfigPanel from "../ConfigPanel/ConfigPanel";
import TestCaliper from "../TestCaliper/TestCaliper";
import QuestionPanel from "../QuestionPanel/QuestionPanel";
import TestSummary from "../TestSummary/TestSummary"; // Add this import

const initialTestConfig: TestConfig = {
  difficulty: "medium",
  numberOfQuestions: 5,
};

const PracticePage: React.FC = () => {
  const [testConfig, setTestConfig] = useState<TestConfig>(initialTestConfig);
  const {
    testState,
    startNewTest,
    submitAnswer,
    moveToNextQuestion,
    isLastQuestion,
    isTestCompleted,
    selectAnswer,
  } = usePracticeTest();

  const handleStartTest = () => {
    startNewTest(testConfig);
  };

  const handleSelectAnswer = (answer: number) => {
    selectAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (testState.selectedAnswer !== null) {
      submitAnswer(testState.selectedAnswer);
    }
  };

  const handleRetakeTest = () => {
    startNewTest(testConfig); // Restart with same configuration
  };

  const handleConfigureNewTest = () => {
    // Reset to configuration screen
    startNewTest({ ...initialTestConfig, numberOfQuestions: 0 });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Practice Test</h1>
          {testState.currentQuestion && !isTestCompleted && (
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-600">
                Question {testState.questionsAttempted + 1} of{" "}
                {testState.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">
                Score: {testState.correctAnswers}/{testState.questionsAttempted}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        {!testState.currentQuestion ? (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <ConfigPanel
              config={testConfig}
              onConfigChange={setTestConfig}
              onStartTest={handleStartTest}
            />
          </div>
        ) : isTestCompleted ? (
          <TestSummary
            score={testState.correctAnswers}
            totalQuestions={testState.totalQuestions}
            onRetakeTest={handleRetakeTest}
            onConfigureNewTest={handleConfigureNewTest}
          />
        ) : (
          <div className="space-y-4">
            {/* Caliper Display */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <TestCaliper
                question={testState.currentQuestion}
                className="mb-4"
              />
              <div className="text-center text-sm text-gray-600">
                What is the measurement shown on the caliper?
              </div>
            </div>

            {/* Question Panel */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <QuestionPanel
                choices={testState.currentQuestion.choices}
                selectedAnswer={testState.selectedAnswer}
                correctAnswer={testState.currentQuestion.correctAnswer}
                isSubmitted={testState.isSubmitted}
                onSelectAnswer={handleSelectAnswer}
                onSubmit={handleSubmitAnswer}
                onNext={moveToNextQuestion}
                isLastQuestion={isLastQuestion}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticePage;
