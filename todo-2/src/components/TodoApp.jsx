import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function TodoApp() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text, priority, dueDate) => {
    if (text.trim() === "") return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        status: "Pending",
        priority,
        dueDate,
      },
    ]);
  };

  const updateStatus = (id, newStatus) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText, newPriority, newDueDate) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, priority: newPriority, dueDate: newDueDate }
          : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <h1 className="title">Advanced Todo App</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={todos}
        updateStatus={updateStatus}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default TodoApp;
