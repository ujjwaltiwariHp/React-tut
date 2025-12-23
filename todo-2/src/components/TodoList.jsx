import TodoItem from "./TodoItem";

function TodoList({ todos, updateStatus, deleteTodo, editTodo }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="empty">No tasks yet...</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateStatus={updateStatus}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
