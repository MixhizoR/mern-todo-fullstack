import { Todo } from "../types";

const TodoItem = ({ _id, title, isCompleted }: Todo) => {
  const handleComplete = () => {
    fetch(`http://localhost:3000/api/posts/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, isCompleted: !isCompleted }),
    }).then(() => window.location.reload());
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/posts/${_id}`, {
      method: "DELETE",
    }).then(() => window.location.reload());
  };

  return (
    <>
      <h2>{title}</h2>
      <p>{isCompleted ? "Completed" : "Not Completed"}</p>
      <button className="btn btn-primary" onClick={handleComplete}>
        Complete
      </button>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};

export default TodoItem;
