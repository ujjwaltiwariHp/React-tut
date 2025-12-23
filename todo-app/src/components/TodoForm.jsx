// src/components/TodoForm.jsx
import React, { useState } from 'react';
import { validateTodo } from '../utils/validation';

function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 REACT CONCEPT: Form validation
    const validation = validateTodo(input);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    onAddTodo(input.trim());
    setInput('');
    setError('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (error) setError(''); // Clear error on typing
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="What's on your mind today?"
          className={`w-full px-6 py-4 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-200 bg-gray-50 ${
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-gray-200 focus:border-purple-400'
          }`}
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          ➕
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-2 ml-2 animate-pulse">
          {error}
        </p>
      )}
    </form>
  );
}

export default TodoForm;