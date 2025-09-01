import { useState } from "react";

function TodoItem({ todo, updateStatus, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newPriority, setNewPriority] = useState(todo.priority);
  const [newDueDate, setNewDueDate] = useState(todo.dueDate);

  const handleSave = () => {
    editTodo(todo.id, newText, newPriority, newDueDate);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.status === "Completed" ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="datetime-local"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <div>
            <strong>{todo.text}</strong>
            <p>Status: {todo.status}</p>
            <p>Priority: {todo.priority}</p>
            <p>Due: {todo.dueDate ? new Date(todo.dueDate).toLocaleString() : "N/A"}</p>
          </div>
          <div>
            <select
              value={todo.status}
              onChange={(e) => updateStatus(todo.id, e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
