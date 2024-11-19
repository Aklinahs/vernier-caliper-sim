// src/features/practice/components/ConfigPanel/ConfigPanel.tsx

import React from "react";
import { TestConfig, TestDifficulty } from "../../types/practice.types";

interface ConfigPanelProps {
  config: TestConfig;
  onConfigChange: (config: TestConfig) => void;
  onStartTest: () => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  onConfigChange,
  onStartTest,
}) => {
  const handleDifficultyChange = (difficulty: TestDifficulty) => {
    onConfigChange({ ...config, difficulty });
  };

  const handleQuestionsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onConfigChange({ ...config, numberOfQuestions: Number(e.target.value) });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Select Difficulty
        </h3>
        <div className="flex gap-3">
          {(["easy", "medium", "hard"] as TestDifficulty[]).map(
            (difficulty) => (
              <button
                key={difficulty}
                onClick={() => handleDifficultyChange(difficulty)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors
                                ${
                                  config.difficulty === difficulty
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
              >
                {difficulty}
              </button>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Number of Questions
        </h3>
        <select
          value={config.numberOfQuestions}
          onChange={handleQuestionsChange}
          className="block w-full px-4 py-2 rounded-lg bg-gray-100 border-gray-200 focus:border-green-500 focus:ring-green-500"
        >
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>
              {num} questions
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onStartTest}
        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Start Practice Test
      </button>
    </div>
  );
};

export default ConfigPanel;
