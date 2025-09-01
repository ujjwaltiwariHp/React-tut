import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/slices/authSlice";
import todoReducer from "../../store/slices/todoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
});

export default store;
