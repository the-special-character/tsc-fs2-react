import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import "./app.css";
import AI from "./axioInstance";
import TodoFilter from "./todoFilter";
import TodoForm from "./todoForm";
import TodoList from "./todoList";

const todoInitalState = {
  loading: false,
  todoList: [],
  filterType: "all",
  error: null,
};

const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_TODO_REQUEST":
    case "ADD_TODO_REQUEST":
    case "UPDATE_TODO_REQUEST":
    case "DELETE_TODO_REQUEST":
      return { ...state, loading: true, error: null };

    case "LOAD_TODO_SUCCESS":
      return { ...state, ...payload, loading: false };

    case "ADD_TODO_SUCCESS":
      return {
        ...state,
        loading: false,
        filterType: "all",
        todoList: [...state.todoList, payload],
      };

    case "LOAD_TODO_ERROR":
    case "ADD_TODO_ERROR":
    case "UPDATE_TODO_ERROR":
    case "DELETE_TODO_ERROR":
      return { ...state, ...payload, loading: false };

    default:
      break;
  }
};

function App() {
  const todoTextRef = useRef("");
  const [{ loading, error, todoList, filterType }, dispatch] = useReducer(
    todoReducer,
    todoInitalState
  );

  const loadTodo = useCallback(async (ft) => {
    try {
      dispatch({ type: "LOAD_TODO_REQUEST" });
      let url = "todoList";
      if (ft !== "all") {
        url = `${url}?isDone=${ft === "completed"}`;
      }
      const res = await AI.get(url);
      dispatch({
        type: "LOAD_TODO_SUCCESS",
        payload: { todoList: res.data, filterType: ft },
      });
    } catch (error) {
      dispatch({
        type: "LOAD_TODO_ERROR",
        payload: { error },
      });
    }
  }, []);

  useEffect(() => {
    loadTodo("all");
  }, []);

  const addTodo = useCallback(async (event) => {
    try {
      event.preventDefault();
      dispatch({ type: "ADD_TODO_REQUEST" });
      const todoText = todoTextRef.current.value;
      const data = { text: todoText, isDone: false };
      const res = await AI.post("todoList", data);
      // todoTextRef.current.value = "";
      dispatch({ type: "ADD_TODO_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "ADD_TODO_ERROR", payload: { error } });
    }
  }, []);

  const toggleComplete = useCallback(async (item) => {
    // try {
    //   const res = await AI.put(`todoList/${item.id}`, {
    //     ...item,
    //     isDone: !item.isDone,
    //   });
    //   setTodoList((value) => {
    //     const index = value.findIndex((x) => x.id === item.id);
    //     return [...value.slice(0, index), res.data, ...value.slice(index + 1)];
    //   });
    // } catch (error) {}
  }, []);

  const deleteTodo = useCallback(async (item) => {
    // try {
    //   await AI.delete(`todoList/${item.id}`);
    //   setTodoList((value) => {
    //     const index = value.findIndex((x) => x.id === item.id);
    //     return [...value.slice(0, index), ...value.slice(index + 1)];
    //   });
    // } catch (error) {}
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

  if (loading) {
    return <h1>Loaindg...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="wrapper">
      <h1 className="title">Todo App</h1>
      <p>Hello</p>
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
