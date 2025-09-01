import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, toggleTodo, deleteTodo, clearCompleted } from "../store/slices/todoSlice";
import { logout } from "../store/slices/authSlice";
import Button from "../components/Button";

function Home() {
  const dispatch = useDispatch();
  const todos = useSelector((s) => s.todos);
  const [text, setText] = useState("");

  const onAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text.trim()));
    setText("");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-xl rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-lg border hover:bg-gray-50"
        >
          Logout
        </button>
      </div>

      <form onSubmit={onAdd} className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded-lg p-2"
          placeholder="Add a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button label="Add" />
      </form>

      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between bg-gray-100 rounded-lg p-2"
          >
            <span
              onClick={() => dispatch(toggleTodo(t.id))}
              className={`cursor-pointer ${
                t.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {t.text}
            </span>
            <button
              onClick={() => dispatch(deleteTodo(t.id))}
              className="text-red-600 font-semibold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between">
        <span className="text-sm text-gray-600">
          {todos.filter((t) => !t.completed).length} pending
        </span>
        <button
          onClick={() => dispatch(clearCompleted())}
          className="text-sm underline"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default Home;
