import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1 className={count > 0 ? "positive" : count < 0 ? "negative" : "neutral"}>Counter: {count}</h1>

      <div className="btn-group">
        <button onClick={() => setCount(count + 1)} className="btn increment"> Increment </button>
        <button onClick={() => setCount(count > 0 ? count - 1 : 0)} className="btn decrement" >Decrement</button>
        <button onClick={() => setCount(0)} className="btn reset">Reset</button>
      </div>
    </div>
  );
}

export default App;
