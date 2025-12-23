// src/utils/helpers.js

// 🔥 UTILITY: Generate unique ID
export function generateId() {
  return Date.now() + Math.random().toString(36).substr(2, 9);
}

// 🔥 UTILITY: Format date
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// 🔥 UTILITY: Todo statistics
export function getTodoStats(todos) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    completionRate
  };
}

// 🔥 UTILITY: Filter todos by status
export function filterTodos(todos, filter) {
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'pending':
      return todos.filter(todo => !todo.completed);
    case 'all':
    default:
      return todos;
  }
}