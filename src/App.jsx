import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import "./app.css";
import AI from "./axioInstance";
import TodoFilter from "./todoFilter";
import TodoForm from "./todoForm";
import TodoList from "./todoList";

function App() {
  const todoTextRef = useRef("");
  const [todoList, setTodoList] = useState([]);
  const [filterType, setFilterType] = useState("all");

  const loadTodo = useCallback(async (ft) => {
    try {
      let url = "todoList";
      if (ft !== "all") {
        url = `${url}?isDone=${ft === "completed"}`;
      }
      const res = await AI.get(url);
      setTodoList(res.data);
      setFilterType(ft);
    } catch (error) {}
  }, []);

  useEffect(() => {
    loadTodo("all");
  }, []);

  const addTodo = useCallback(async (event) => {
    try {
      event.preventDefault();
      const todoText = todoTextRef.current.value;
      const data = { text: todoText, isDone: false };

      const res = await AI.post("todoList", data);
      setTodoList((val) => [...val, res.data]);
      setFilterType("all");
      todoTextRef.current.value = "";
    } catch (error) {}
  }, []);

  const toggleComplete = useCallback(async (item) => {
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
  }, []);

  const deleteTodo = useCallback(async (item) => {
    try {
      await AI.delete(`todoList/${item.id}`);
      setTodoList((value) => {
        const index = value.findIndex((x) => x.id === item.id);
        return [...value.slice(0, index), ...value.slice(index + 1)];
      });
    } catch (error) {}
  }, []);

  const btns = useMemo(
    () => [
      {
        name: "All",
        value: "all",
      },
      {
        name: "Pending",
        value: "pending",
      },
      {
        name: "Completed",
        value: "completed",
      },
    ],
    []
  );

  console.log("App");
  return (
    <div className="wrapper">
      <h1 className="title">Todo App</h1>
      <TodoForm addTodo={addTodo} ref={todoTextRef} />
      <TodoList
        todoList={todoList}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
      <TodoFilter loadTodo={loadTodo} btns={btns} />
    </div>
  );
}

export default App;
