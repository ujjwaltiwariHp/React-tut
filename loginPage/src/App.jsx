import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const { isAuthenticated } = useSelector((s) => s.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/home" : "/"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
