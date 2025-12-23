// src/components/TodoItem.jsx
import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onToggle, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-4 transition-all duration-300 hover:bg-white/80 hover:shadow-lg hover:scale-[1.02] ${
        todo.completed ? 'opacity-75' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center space-x-4">
        {/* Custom Checkbox */}
        <div className="relative">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="sr-only"
          />
          <div
            onClick={() => onToggle(todo.id)}
            className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
              todo.completed
                ? 'bg-gradient-to-r from-green-400 to-blue-500 border-green-400'
                : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            {todo.completed && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
        </div>

        {/* Todo Text */}
        <span
          className={`flex-1 text-lg transition-all duration-300 ${
            todo.completed
              ? 'line-through text-gray-500'
              : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(todo.id)}
          className={`p-2 rounded-xl transition-all duration-300 ${
            isHovered
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'text-gray-400 hover:text-red-500'
          }`}
          title="Delete todo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>

      {/* Completion indicator */}
      {todo.completed && (
        <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          ✓
        </div>
      )}
    </div>
  );
}

export default TodoItem;