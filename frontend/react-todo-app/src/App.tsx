import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import { Todo } from "./types";
import TodoAddForm from "./components/TodoAddForm";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todo App</h1>
      <TodoList todos={todos} />
      <TodoAddForm />
    </div>
  );
}

export default App;
