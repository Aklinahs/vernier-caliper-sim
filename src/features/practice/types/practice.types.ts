// src/features/practice/types/practice.types.ts

export type TestDifficulty = 'easy' | 'medium' | 'hard';

export interface PracticeQuestion {
    id: string;
    measurement: number;  // The actual measurement value
    choices: number[];   // Multiple choice options
    correctAnswer: number;
    settings: {
        mainScaleLength: 100 | 200 | 300;
        mainScaleDivision: 0.5 | 1 | 2;
        vernierDivisions: 10 | 20 | 25 | 40 | 50;
    };
}

export interface TestState {
    currentQuestion: PracticeQuestion | null;
    selectedAnswer: number | null;
    isSubmitted: boolean;
    questionsAttempted: number;
    correctAnswers: number;
    totalQuestions: number;
}

export interface TestConfig {
    difficulty: TestDifficulty;
    numberOfQuestions: number;
}