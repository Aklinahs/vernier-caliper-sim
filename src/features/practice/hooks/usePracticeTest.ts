// src/features/practice/hooks/usePracticeTest.ts

import { useState, useCallback } from 'react';
import { TestConfig, TestState, PracticeQuestion } from '../types/practice.types';
import { generateQuestion } from '../services/testGenerator';

const initialTestState: TestState = {
  currentQuestion: null,
  selectedAnswer: null,
  isSubmitted: false,
  questionsAttempted: 0,
  correctAnswers: 0,
  totalQuestions: 0,
};

export const usePracticeTest = () => {
  const [testState, setTestState] = useState<TestState>(initialTestState);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const startNewTest = useCallback((config: TestConfig) => {
    setIsTestCompleted(false);
    const firstQuestion = generateQuestion(config.difficulty);
    setTestState({
      ...initialTestState,
      currentQuestion: firstQuestion,
      totalQuestions: config.numberOfQuestions,
    });
  }, []);

  const selectAnswer = useCallback((answer: number) => {
    setTestState(prev => ({
      ...prev,
      selectedAnswer: answer
    }));
  }, []);

  const submitAnswer = useCallback((answer: number) => {
    setTestState(prev => ({
      ...prev,
      isSubmitted: true,
      correctAnswers: prev.correctAnswers + (answer === prev.currentQuestion?.correctAnswer ? 1 : 0),
    }));
  }, []);

  const moveToNextQuestion = useCallback(() => {
    setTestState(prev => {
      // Check if this was the last question
      if (prev.questionsAttempted + 1 >= prev.totalQuestions) {
        setIsTestCompleted(true);
        return prev;
      }

      // Generate next question
      const nextQuestion = generateQuestion('medium'); // or use stored difficulty
      return {
        ...prev,
        currentQuestion: nextQuestion,
        selectedAnswer: null,
        isSubmitted: false,
        questionsAttempted: prev.questionsAttempted + 1,
      };
    });
  }, []);

  const isLastQuestion = testState.questionsAttempted + 1 === testState.totalQuestions;

  return {
    testState,
    startNewTest,
    selectAnswer,
    submitAnswer,
    moveToNextQuestion,
    isLastQuestion,
    isTestCompleted,
  };
};