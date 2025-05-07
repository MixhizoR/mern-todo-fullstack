import TodoItem from "./TodoItem";
import { Todo } from "../types";

interface Props {
  todos: Todo[];
  onCompleteItem: (_id: string, isCompleted: boolean) => void;
  onDeleteItem: (_id: string) => void;
}

const TodoList = ({ todos, onCompleteItem, onDeleteItem }: Props) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onCompleteItem={onCompleteItem}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </div>
  );
};

export default TodoList;
