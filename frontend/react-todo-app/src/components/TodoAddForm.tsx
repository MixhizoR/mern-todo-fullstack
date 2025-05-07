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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Yeni todo girin..."
        value={todoText}
        onChange={handleTextChange}
      />
      <label style={{ marginLeft: "10px" }}>
        Tamamlandı mı?
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCompletedChange}
        />
      </label>
      <button type="submit" style={{ marginLeft: "10px" }}>
        Todo Ekle
      </button>
    </form>
  );
};

export default TodoAddForm;
