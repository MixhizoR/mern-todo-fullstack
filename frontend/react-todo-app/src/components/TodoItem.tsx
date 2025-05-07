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
    <div className="todo-item-container w-100 d-flex align-items-center gap-2 p-2">
      {/* Allow this flex child to shrink below its content’s width */}
      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <h2
          className="fw-bold text-break mb-0"
          style={{ textDecoration: isCompleted ? "line-through" : "none" }}
        >
          {todo.title}
        </h2>
      </div>

      <input
        className="form-check-input todo-item-checkbox"
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => {
          setIsCompleted(e.target.checked);
          onCompleteItem(todo._id, e.target.checked);
        }}
      />

      <button
        className="btn btn-danger fw-bold todo-item-delete-button"
        onClick={() => onDeleteItem(todo._id)}
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
