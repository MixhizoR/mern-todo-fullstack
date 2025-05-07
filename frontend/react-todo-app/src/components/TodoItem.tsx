import { useState } from "react";
import { Todo } from "../types";

interface Props {
  todo: Todo;
  onCompleteItem: (_id: string, isCompleted: boolean) => void;
  onDeleteItem: (_id: string) => void;
}

const TodoItem = ({ todo, onCompleteItem, onDeleteItem }: Props) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  return (
    <>
      <h2>{todo.title}</h2>
      <p>{isCompleted ? "Completed" : "Not Completed"}</p>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => {
          setIsCompleted(e.target.checked);
          onCompleteItem(todo._id, e.target.checked);
        }}
      />
      <button className="btn btn-danger" onClick={() => onDeleteItem(todo._id)}>
        Delete
      </button>
    </>
  );
};

export default TodoItem;
