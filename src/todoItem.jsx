import React, { memo } from "react";

const TodoItem = ({ toggleComplete, deleteTodo, item }) => {
  console.log("Todo Item render");
  return (
    <div className="flex items-center m-10">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => toggleComplete(item)}
      />
      <p
        className="flex-1"
        style={{
          textDecoration: item.isDone ? "line-through" : "none",
        }}
      >
        {item.text}
      </p>
      <button className="btn" type="button" onClick={() => deleteTodo(item)}>
        Delete
      </button>
    </div>
  );
};

export default memo(TodoItem);
