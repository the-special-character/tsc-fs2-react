import React, { memo } from "react";
import TodoItem from "./todoItem";

const TodoList = ({ todoList, toggleComplete, deleteTodo }) => {
  console.log("Todo List");
  return (
    <div className="w-full flex-1 overflow-auto">
      {todoList.map((item) => {
        return (
          <TodoItem
            key={item.id}
            item={item}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
};

export default memo(TodoList);
