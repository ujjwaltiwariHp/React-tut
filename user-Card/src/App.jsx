import Card from "./components/Card";
import "./App.css";

function App() {
  const users = [
    { name: "Ujjwal", role: "Developer", email: "ujjwal@example.com" ,contact:"1234567890"},
    { name: "Ravi", role: "Manager", email: "ravi@example.com" ,contact:"1234567890"},
    { name: "Sneha", role: "Tester", email: "sneha@example.com" ,contact:"1234567890"},
    { name: "Aman", role: "Intern", email: "aman@example.com" , contact:"1234567890"},
    { name: "Rohit", role: "Developer", email: "rohit@example.com" ,contact:"1234567890"},
    { name: "Akanksha", role: "Designer", email: "akanksha@example.com" , contact:"1234567890"},
  ];

  return (
    <div className="card-container">
      {users.map((user, idx) => (
        <Card key={idx} {...user} />
      ))}
    </div>
  );
}

export default App;
