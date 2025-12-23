// src/components/TodoCard.jsx - Simple Version
import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoCard() {
  // Direct useState instead of custom hook
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Basics', completed: false },
    { id: 2, text: 'Build Amazing Todo App', completed: false }
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          ✨ Todo Magic
        </h1>
        <p className="text-gray-600">Get things done, beautifully</p>
      </div>

      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo}
        onToggleTodo={toggleTodo}
      />

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <div className="flex space-x-4">
            <span className="text-gray-600">
              📝 Total: <strong className="text-purple-600">{totalCount}</strong>
            </span>
            <span className="text-gray-600">
              ✅ Done: <strong className="text-green-600">{completedCount}</strong>
            </span>
          </div>
          <div className="text-gray-500">
            {completedCount === totalCount && totalCount > 0 && "🎉 All done!"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;