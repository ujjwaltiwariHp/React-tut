import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    }
  });

  return (
    <div className="App">
      {user ? (
        <TodoApp user={user} setUser={setUser} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;
