import React, { forwardRef, memo } from "react";

const TodoForm = forwardRef(({ addTodo }, ref) => {
  console.log("TodoForm render");
  return (
    <form onSubmit={addTodo}>
      <input className="txt-input" type="text" name="" id="" ref={ref} />
      <button type="submit" className="btn">
        Add Todo
      </button>
    </form>
  );
});

export default memo(TodoForm);
