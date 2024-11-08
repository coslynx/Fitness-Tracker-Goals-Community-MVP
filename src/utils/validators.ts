// src/utils/validators.ts

import { Goal } from '../types'; 

// 1. Email Validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 2. Password Validation
const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  );
};

// 3. Date Validation
const validateDate = (date: Date): boolean => {
  const today = new Date();
  return date <= today;
};

// 4. Goal Name Validation
const validateGoalName = (name: string): boolean => {
  const minLength = 3;
  const maxLength = 30;
  return (
    name.length >= minLength &&
    name.length <= maxLength &&
    !/[^A-Za-z0-9\s-]/.test(name)
  );
};

export { validateEmail, validatePassword, validateDate, validateGoalName };