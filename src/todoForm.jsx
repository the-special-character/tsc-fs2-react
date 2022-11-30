import React, { forwardRef, memo } from "react";

const TodoForm = forwardRef(({ addTodo }, ref) => {
  console.log("Todo Form");
  return (
    <form onSubmit={addTodo}>
      <input type="text" className="txt-input" ref={ref} />
      <button className="btn" type="submit">
        Add Todo
      </button>
    </form>
  );
});

export default memo(TodoForm);
