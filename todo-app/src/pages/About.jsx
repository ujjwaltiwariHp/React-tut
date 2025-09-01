// src/pages/About.jsx
import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          About Todo Magic ✨
        </h1>

        <p className="text-gray-700 mb-6">
          A beautiful, modern todo application built with React and Tailwind CSS.
          Perfect for learning React concepts and managing your daily tasks.
        </p>

        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">⚡</span>
            <span className="text-gray-600">Fast and responsive</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🎨</span>
            <span className="text-gray-600">Beautiful glassmorphism design</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔧</span>
            <span className="text-gray-600">Built with React hooks</span>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            ← Back to Todos
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;