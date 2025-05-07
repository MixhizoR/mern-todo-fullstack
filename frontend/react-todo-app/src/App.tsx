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

  const handleAddItem = async (title: string, isCompleted: boolean) => {
    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, isCompleted }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      const newTodo: Todo = await response.json();
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleComplete = (_id: string, isCompleted: boolean) => {
    try {
      fetch(`http://localhost:3000/api/posts/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted }),
      })
        .then(async (response) => {
          const updatedTodo = await response.json();
          setTodos(
            todos.map((todo) =>
              todo._id === updatedTodo._id ? updatedTodo : todo
            )
          );
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (_id: string) => {
    fetch(`http://localhost:3000/api/posts/${_id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        const deletedTodo = await response.json();
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== deletedTodo._id)
        );
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <div className="container todo-container">
      <h1 className="text-center">Todo App</h1>
      <hr />
      <TodoList
        todos={todos}
        onCompleteItem={handleComplete}
        onDeleteItem={handleDelete}
      />
      <hr />
      <TodoAddForm onAddTodo={handleAddItem} />
    </div>
  );
}

export default App;
