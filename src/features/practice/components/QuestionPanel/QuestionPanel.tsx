// src/features/practice/components/QuestionPanel/QuestionPanel.tsx

import React from "react";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface QuestionPanelProps {
  choices: number[];
  selectedAnswer: number | null;
  correctAnswer: number;
  isSubmitted: boolean;
  onSelectAnswer: (answer: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  choices,
  selectedAnswer,
  correctAnswer,
  isSubmitted,
  onSelectAnswer,
  onSubmit,
  onNext,
  isLastQuestion,
}) => {
  return (
    <div className="space-y-4">
      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-3">
        {choices.map((choice, index) => {
          const isSelected = selectedAnswer === choice;
          const isCorrect = choice === correctAnswer;
          const showResult = isSubmitted && (isSelected || isCorrect);

          return (
            <button
              key={index}
              onClick={() => !isSubmitted && onSelectAnswer(choice)}
              disabled={isSubmitted}
              className={`
                                p-4 rounded-lg text-lg font-medium transition-all
                                ${
                                  isSubmitted
                                    ? "cursor-default"
                                    : "hover:bg-gray-50"
                                }
                                ${
                                  !isSubmitted && isSelected
                                    ? "ring-2 ring-green-500 bg-green-50"
                                    : "bg-white"
                                }
                                ${
                                  showResult && isCorrect
                                    ? "bg-green-50 text-green-700"
                                    : ""
                                }
                                ${
                                  showResult && isSelected && !isCorrect
                                    ? "bg-red-50 text-red-700"
                                    : ""
                                }
                                border-2
                                ${
                                  isSelected
                                    ? "border-green-500"
                                    : "border-gray-200"
                                }
                            `}
            >
              <div className="flex items-center justify-between">
                <span>{choice.toFixed(2)} mm</span>
                {showResult &&
                  (isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-gray-100">
        {!isSubmitted ? (
          <button
            onClick={onSubmit}
            disabled={selectedAnswer === null}
            className={`
                            w-full py-3 rounded-lg font-medium transition-colors
                            ${
                              selectedAnswer === null
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }
                        `}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            {isLastQuestion ? "Complete Test" : "Next Question"}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Feedback Message */}
      {isSubmitted && (
        <div
          className={`p-4 rounded-lg ${
            selectedAnswer === correctAnswer
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {selectedAnswer === correctAnswer ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Correct! Well done!</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                <span>Incorrect!</span>
              </div>
              <div className="mt-2 text-sm">
                The correct answer is {correctAnswer.toFixed(2)} mm
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionPanel;
