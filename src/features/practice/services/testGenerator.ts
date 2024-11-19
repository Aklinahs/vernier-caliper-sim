// src/features/practice/services/testGenerator.ts

import { PracticeQuestion, TestDifficulty } from '../types/practice.types';

// Utility function to generate random number within range
const randomInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Utility function to round to specific decimal places
const roundToDecimal = (num: number, decimals: number): number => {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
};

// Get settings based on difficulty
const getSettingsForDifficulty = (difficulty: TestDifficulty) => {
    switch (difficulty) {
        case 'easy':
            return {
                mainScaleLength: 100 as const,
                mainScaleDivision: 1 as const,
                vernierDivisions: 10 as const
            };
        case 'medium':
            return {
                mainScaleLength: 200 as const,
                mainScaleDivision: 1 as const,
                vernierDivisions: 20 as const
            };
        case 'hard':
            return {
                mainScaleLength: 300 as const,
                mainScaleDivision: 0.5 as const,
                vernierDivisions: 50 as const
            };
    }
};

// Generate wrong answers that are close to the correct answer
const generateChoices = (correctAnswer: number, difficulty: TestDifficulty): number[] => {
    const choices: number[] = [correctAnswer];
    const settings = getSettingsForDifficulty(difficulty);
    const leastCount = settings.mainScaleDivision / settings.vernierDivisions;
    
    // Define the range for wrong answers based on difficulty
    const errorRange = {
        easy: 5 * leastCount,
        medium: 3 * leastCount,
        hard: 2 * leastCount
    }[difficulty];

    // Generate 3 wrong answers
    while (choices.length < 4) {
        const offset = (Math.random() - 0.5) * 2 * errorRange;
        const wrongAnswer = roundToDecimal(correctAnswer + offset, 2);
        
        // Ensure the wrong answer is unique and within valid range
        if (!choices.includes(wrongAnswer) && 
            wrongAnswer >= 0 && 
            wrongAnswer <= settings.mainScaleLength) {
            choices.push(wrongAnswer);
        }
    }

    // Shuffle the choices
    return choices.sort(() => Math.random() - 0.5);
};

export const generateQuestion = (difficulty: TestDifficulty): PracticeQuestion => {
    const settings = getSettingsForDifficulty(difficulty);
    const leastCount = settings.mainScaleDivision / settings.vernierDivisions;

    // Generate a random measurement based on difficulty
    const maxValue = settings.mainScaleLength - 10; // Leave some margin
    const measurement = roundToDecimal(
        randomInRange(5, maxValue * (1/leastCount)) * leastCount,
        2
    );

    const choices = generateChoices(measurement, difficulty);

    return {
        id: Math.random().toString(36).substr(2, 9),
        measurement,
        choices,
        correctAnswer: measurement,
        settings
    };
};

export const generateQuestionSet = (
    difficulty: TestDifficulty,
    numberOfQuestions: number
): PracticeQuestion[] => {
    return Array.from(
        { length: numberOfQuestions },
        () => generateQuestion(difficulty)
    );
};