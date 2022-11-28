import React, { useRef, useState } from "react";
import { clsx } from "clsx";
import "./app.css";

function App() {
  const todoTextRef = useRef("");
  const [todoList, setTodoList] = useState([]);

  const addTodo = (event) => {
    event.preventDefault();
    const todoText = todoTextRef.current.value;
    setTodoList((val) => [
      ...val,
      { id: new Date().valueOf(), text: todoText, isDone: false },
    ]);
    todoTextRef.current.value = "";
  };

  const toggleComplete = (item) => {
    setTodoList((value) => {
      const index = value.findIndex((x) => x.id === item.id);
      return [
        ...value.slice(0, index),
        { ...item, isDone: !item.isDone },
        ...value.slice(index + 1),
      ];
    });
  };
  const deleteTodo = (item) => {
    setTodoList((value) => {
      const index = value.findIndex((x) => x.id === item.id);
      return [...value.slice(0, index), ...value.slice(index + 1)];
    });
  };

  console.log("render");
  return (
    <div className="wrapper">
      <h1 className="title">Todo App</h1>
      <form onSubmit={addTodo}>
        <input type="text" className="txt-input" ref={todoTextRef} />
        <button className="btn" type="submit">
          Add Todo
        </button>
      </form>
      <div className="w-full">
        {todoList.map((item) => {
          return (
            <div key={item.id} className="flex items-center m-8">
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => toggleComplete(item)}
              />
              <p
                className={clsx("flex-1 px-8", {
                  "line-through": item.isDone,
                })}
                // style={{
                //   textDecoration: item.isDone ? "line-through" : "none",
                // }}
              >
                {item.text}
              </p>
              <button
                className="btn"
                type="button"
                onClick={() => deleteTodo(item)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
