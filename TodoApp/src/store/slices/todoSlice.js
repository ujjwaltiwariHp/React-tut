import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now().toString(),
        text: action.payload.text,
        date: action.payload.date,
        time: action.payload.time,
        priority: action.payload.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text, date, time, priority } = action.payload;
      const todo = state.find((t) => t.id === id);
      if (todo) {
        todo.text = text;
        todo.date = date;
        todo.time = time;
        todo.priority = priority;
        todo.updatedAt = new Date().toISOString();
      }
    },
    clearCompleted: (state) => {
      return state.filter((t) => !t.completed);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;