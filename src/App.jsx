import React from "react";
import "./app.css";
import TodoFilter from "./todoFilter";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import useTodo from "./hooks/useTodo";

function App() {
  const {
    addTodo,
    deleteTodo,
    loadTodo,
    filterBtns,
    todoState: { todoList, hasError, isLoading, filterType },
    todoTextRef,
    toggleComplete,
  } = useTodo();

  if (hasError) {
    return <h1>{hasError.message}</h1>;
  }

  return (
    <div className="wrapper">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} ref={todoTextRef} />
      {isLoading ? (
        <h1 className="flex-1 h-full">Loading...</h1>
      ) : (
        <TodoList
          todoList={todoList}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      )}

      <TodoFilter filterBtns={filterBtns} changeFilterType={loadTodo} />
    </div>
  );
}

export default App;
