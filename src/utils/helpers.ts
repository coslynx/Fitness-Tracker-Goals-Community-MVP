// src/utils/helpers.ts

import { Goal } from '../types'; 

// 1. Format Date
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long', 
    day: 'numeric', 
    year: 'numeric', 
  };
  return date.toLocaleDateString('en-US', options);
};

// 2. Calculate Progress 
const calculateProgress = (goal: Goal, currentProgress: number): number => {
  if (goal.targetProgress && currentProgress >= 0) { 
    return Math.round((currentProgress / goal.targetProgress) * 100);
  }
  return 0;
};

// 3. Generate Random ID 
const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// 4. Debounce (for input throttling) 
const debounce = (func: Function, delay: number): Function => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export { formatDate, calculateProgress, generateRandomId, debounce };