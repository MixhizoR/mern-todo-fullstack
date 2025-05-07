import React, { useState, FormEvent } from "react";

interface TodoAddFormProps {
  onAddTodo: (text: string, isCompleted: boolean) => void;
}

const TodoAddForm = ({ onAddTodo }: TodoAddFormProps) => {
  const [todoText, setTodoText] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const handleCompletedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsCompleted(event.target.checked);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (todoText.trim()) {
      onAddTodo(todoText.trim(), isCompleted);
      setTodoText("");
      setIsCompleted(false);
    }
  };

  return (
    <form
      className="todo-add-form d-flex gap-2 form-group"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Add todo..."
        value={todoText}
        onChange={handleTextChange}
        className="form-control"
      />
      <label>
        
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCompletedChange}
          className="form-check-input"
        />
      </label>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

export default TodoAddForm;
