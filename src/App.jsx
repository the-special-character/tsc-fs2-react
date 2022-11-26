import React, { useRef, useState } from "react";
import "./app.css";

function App() {
  const todoTextRef = useRef("");
  const [todoList, setTodoList] = useState([]);

  const addTodo = (event) => {
    event.preventDefault();
    const todoText = todoTextRef.current.value;
    setTodoList((val) => [
      ...val,
      { id: new Date().valueOf(), text: todoText },
    ]);
    todoTextRef.current.value = "";
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
      <div>
        {todoList.map((item, index) => {
          return <p key={item.id}>{item.text}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
