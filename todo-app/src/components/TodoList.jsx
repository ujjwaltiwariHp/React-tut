// src/components/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDeleteTodo, onToggleTodo }) {
  return (
    <div className="space-y-3 max-h-96 overflow-y-auto todo-list">
      {todos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-8xl mb-4">🌟</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Your canvas awaits
          </h3>
          <p className="text-gray-500">
            Add your first task and start creating magic!
          </p>
        </div>
      ) : (
        <div>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDeleteTodo}
              onToggle={onToggleTodo}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;