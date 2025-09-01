// src/utils/validation.js

export function validateTodo(text) {
  // Remove extra spaces
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: '⚠️ Please enter a todo item'
    };
  }

  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: '⚠️ Todo must be at least 2 characters'
    };
  }

  if (trimmed.length > 100) {
    return {
      isValid: false,
      error: '⚠️ Todo is too long (max 100 characters)'
    };
  }

  return {
    isValid: true,
    error: null
  };
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}