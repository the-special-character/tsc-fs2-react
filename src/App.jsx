import React, { useRef, useState, useEffect } from "react";
import "./app.css";
import AI from "./axioInstance";

function App() {
  const todoTextRef = useRef("");
  const [todoList, setTodoList] = useState([]);
  const [filterType, setFilterType] = useState("all");

  const loadTodo = async (ft) => {
    try {
      let url = "todoList";
      if (ft !== "all") {
        url = `${url}?isDone=${ft === "completed"}`;
      }
      const res = await AI.get(url);
      setTodoList(res.data);
      setFilterType(ft);
    } catch (error) {}
  };

  useEffect(() => {
    loadTodo("all");
  }, []);

  const addTodo = async (event) => {
    try {
      event.preventDefault();
      const todoText = todoTextRef.current.value;
      const data = { text: todoText, isDone: false };

      const res = await AI.post("todoList", data);
      setTodoList((val) => [...val, res.data]);
      setFilterType("all");
      todoTextRef.current.value = "";
    } catch (error) {}
  };

  const toggleComplete = async (item) => {
    try {
      const res = await AI.put(`todoList/${item.id}`, {
        ...item,
        isDone: !item.isDone,
      });

      setTodoList((value) => {
        const index = value.findIndex((x) => x.id === item.id);
        return [...value.slice(0, index), res.data, ...value.slice(index + 1)];
      });
    } catch (error) {}
  };

  const deleteTodo = async (item) => {
    try {
      await AI.delete(`todoList/${item.id}`);
      setTodoList((value) => {
        const index = value.findIndex((x) => x.id === item.id);
        return [...value.slice(0, index), ...value.slice(index + 1)];
      });
    } catch (error) {}
  };

  console.log("hello");
  return (
    <div className="wrapper">
      <h1 className="title">Todo App</h1>
      <form onSubmit={addTodo}>
        <input type="text" className="txt-input" ref={todoTextRef} />
        <button className="btn" type="submit">
          Add Todo
        </button>
      </form>
      <div className="w-full flex-1 overflow-auto">
        {todoList.map((item) => {
          return (
            <div key={item.id} className="flex items-center m-8">
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => toggleComplete(item)}
              />
              <p className="flex-1 px-8">{item.text}</p>
              <button
                type="button"
                className="btn"
                onClick={() => deleteTodo(item)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div className="w-full flex">
        <button
          type="button"
          onClick={() => loadTodo("all")}
          className="btn flex-1 rounded-none"
        >
          All
        </button>
        <button
          type="button"
          onClick={() => loadTodo("pending")}
          className="btn flex-1 rounded-none"
        >
          Pending
        </button>
        <button
          type="button"
          onClick={() => loadTodo("completed")}
          className="btn flex-1 rounded-none"
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default App;
