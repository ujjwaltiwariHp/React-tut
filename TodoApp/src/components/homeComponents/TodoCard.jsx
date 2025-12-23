import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, updateTodo } from "../../store/slices/todoSlice";
import {
  Trash2,
  Edit,
  CheckCircle,
  Circle,
  Calendar,
  Flag,
  Save,
  X,
  Watch
} from "lucide-react";
import {DateTimePicker,CustomDropdown} from "../../components/index";

function TodoCard({ todo, index }) {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editPriority, setEditPriority] = useState("Low");

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDate(todo.date || "");
    setEditTime(todo.time || "");
    setEditPriority(todo.priority || "Low");
  };

  const handleSave = (id) => {
    dispatch(updateTodo({
      id,
      text: editText,
      date: editDate,
      time: editTime,
      priority: editPriority
    }));
    setEditingId(null);
    setEditText("");
    setEditDate("");
    setEditTime("");
    setEditPriority("Low");
  };

  const formatDateTime = (date, time) => {
    if (!date) return null;

    let displayDate = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    if (time) {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      displayDate += ` ${displayHour}:${minutes} ${ampm}`;
    }

    return displayDate;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-gradient-to-r from-red-500 via-pink-500 to-red-400 text-white";
      case "Medium":
        return "bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-gray-900";
      default:
        return "bg-gradient-to-r from-green-500 via-emerald-400 to-green-300 text-white";
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90
    rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/50 backdrop-blur-sm">
      {editingId === todo.id ? (
        <div className="space-y-4">
          <input
            className="w-full rounded-xl border border-gray-600 bg-gray-800/70 py-3 px-4
             text-gray-100 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Task description..."
          />

          <DateTimePicker
            date={editDate}
            time={editTime}
            onDateChange={setEditDate}
            onTimeChange={setEditTime}
          />

          <CustomDropdown
            value={editPriority}
            onChange={setEditPriority}
            options={["Low", "Medium", "High"]}
            placeholder="Select Priority"
            icon={<Flag className="w-4 h-4" />}
          />

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => handleSave(todo.id)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500
               text-white shadow hover:scale-105 transition-all flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-400 to-pink-500
               text-white shadow hover:scale-105 transition-all flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3 flex-1">
              <button
                onClick={() => dispatch(toggleTodo(todo.id))}
                className="mt-1"
              >
                {todo.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-500 hover:text-gray-300 transition-colors" />
                )}
              </button>

              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-100"
                  }`}
                >
                  {index + 1}. {todo.text}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {todo.date && (
                    <span className="flex items-center text-xs text-indigo-300 gap-1 bg-indigo-900/40 px-3 py-1 rounded-full">
                      <Calendar className="w-3 h-3" />
                      {formatDateTime(todo.date, todo.time)}
                    </span>
                  )}

                  {todo.priority && (
                    <span
                      className={`flex items-center text-xs font-semibold px-3 py-1 rounded-full ${getPriorityColor(todo.priority)}`}
                    >
                      <Flag className="w-3 h-3 mr-1" />
                      {todo.priority}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleEdit(todo)}
                className="p-2 rounded-xl bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow hover:scale-105 transition-all"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white shadow hover:scale-105 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoCard;