import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import  {addTodo}  from "../../store/slices/todoSlice";
import{ clearCompleted }from "../../store/slices/todoSlice";
import { Plus, Flag } from "lucide-react";
import {Button,Header,TodoCard,DateTimePicker,CustomDropdown} from "../../components/index";
function Home() {
  const dispatch = useDispatch();

  const todos = useSelector((s) => s.todos);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Low");

  const onAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return
    dispatch(
      addTodo({
        text: text.trim(),
        date,
        time,
        priority,
      })
    );

    setText("");
    setDate("");
    setTime("");
    setPriority("Low");
  };

  const pendingTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />

      <main className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <form
              onSubmit={onAdd}
              className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl border
               border-gray-800 ring-2 ring-pink-500/20"
              style={{
                boxShadow:
                  "0 8px 40px 0 rgba(183, 29, 255, 0.2), 0 1.5px 40px 0 rgba(255, 45, 110, 0.2)",
              }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                Add New Task
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-4">
                  <input
                    className="w-full rounded-xl border border-gray-600 bg-gray-900/70 py-4 px-6 text-gray-100
                     placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm text-lg"
                    placeholder="What needs to be done?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <div className="lg:col-span-2">
                  <DateTimePicker
                    date={date}
                    time={time}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                  />
                </div>

                <div>
                  <CustomDropdown
                    value={priority}
                    onChange={setPriority}
                    options={["Low", "Medium", "High"]}
                    placeholder="Priority"
                    icon={<Flag className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <Button
                    label="Add Task"
                    icon={<Plus className="w-5 h-5" />}
                    className="w-full bg-gradient-to-r from-pink-500 via-red-400 to-pink-600
                     text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-all text-lg"
                  />
                </div>
              </div>
            </form>
          </div>

          {pendingTodos.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Pending Tasks ({pendingTodos.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pendingTodos.map((todo, index) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    index={todos.findIndex(t => t.id === todo.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {completedTodos.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-400">
                  Completed Tasks ({completedTodos.length})
                </h2>
                <button
                  onClick={() => dispatch(clearCompleted())}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500
                   text-white font-medium hover:scale-105 transition-all"
                >
                  Clear All Completed
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {completedTodos.map((todo, index) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    index={todos.findIndex(t => t.id === todo.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {todos.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No tasks yet</h3>
              <p className="text-gray-500">Add your first task to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;