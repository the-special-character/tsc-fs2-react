import React, { memo } from "react";

const TodoFilter = ({ btns, loadTodo }) => {
  console.log("Todo Filter");
  return (
    <div className="w-full flex">
      {btns.map((x) => (
        <button
          key={x.value}
          type="button"
          onClick={() => loadTodo(x.value)}
          className="btn flex-1 rounded-none"
        >
          {x.name}
        </button>
      ))}
    </div>
  );
};

export default memo(TodoFilter);
