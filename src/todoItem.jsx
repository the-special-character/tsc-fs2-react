import React, { memo } from "react";

const TodoItem = ({ item, toggleComplete, deleteTodo }) => {
  console.log("Todo Item");
  return (
    <div key={item.id} className="flex items-center m-8">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => toggleComplete(item)}
      />
      <p className="flex-1 px-8">{item.text}</p>
      <button type="button" className="btn" onClick={() => deleteTodo(item)}>
        Delete
      </button>
    </div>
  );
};

export default memo(TodoItem);
