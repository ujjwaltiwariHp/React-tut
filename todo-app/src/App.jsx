// src/App.jsx
import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Basics', completed: false },
    { id: 2, text: 'Build Todo App', completed: false }
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          📝 Todo App
        </h1>

        {/* Add Todo Form */}
        <div className="flex mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">🎯</div>
              <p>No todos yet! Add one above.</p>
            </div>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-all"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="mr-3 w-4 h-4 text-blue-600 rounded"
                  />
                  <span
                    className={`${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <span>Total: <strong>{todos.length}</strong></span>
            <span>Done: <strong className="text-green-600">{todos.filter(t => t.completed).length}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;