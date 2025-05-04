import { useRef } from "react";

const TodoAddForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const isCompletedRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current?.value,
        isCompleted: isCompletedRef.current?.checked,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input type="text" ref={titleRef} />
      <input type="checkbox" ref={isCompletedRef} defaultChecked={false} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoAddForm;
