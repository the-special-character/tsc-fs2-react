import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { todoInitalState, todoReducer } from "../reducers/todoReducer";

const useTodo = () => {
  const todoTextRef = useRef("");
  const [todoState, dispatch] = useReducer(todoReducer, todoInitalState);

  const addTodo = useCallback(async (event) => {
    try {
      event.preventDefault();
      dispatch({ type: "ADD_TODO_REQUEST" });
      const todoText = todoTextRef.current.value;
      const res = await fetch("http://localhost:3004/todoList", {
        method: "POST",
        body: JSON.stringify({
          text: todoText,
          isDone: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      dispatch({ type: "ADD_TODO_SUCCESS", payload: json });
      todoTextRef.current.value = "";
    } catch (error) {
      dispatch({
        type: "ADD_TODO_FAIL",
        payload: { hasError: error },
      });
    }
  }, []);

  const toggleComplete = useCallback(async (item) => {
    try {
      dispatch({ type: "UPDATE_TODO_REQUEST" });
      const res = await fetch(`http://localhost:3004/todoList/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      dispatch({ type: "UPDATE_TODO_SUCCESS", payload: json });
    } catch (error) {
      dispatch({
        type: "UPDATE_TODO_FAIL",
        payload: { hasError: error },
      });
    }
  }, []);

  const deleteTodo = useCallback(async (item) => {
    try {
      dispatch({ type: "DELETE_TODO_REQUEST" });
      await fetch(`http://localhost:3004/todoList/${item.id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_TODO_SUCCESS", payload: item });
    } catch (error) {
      dispatch({
        type: "DELETE_TODO_FAIL",
        payload: { hasError: error },
      });
    }
  }, []);

  const filterBtns = useMemo(
    () => [
      {
        text: "All",
        value: "all",
      },
      {
        text: "Pending",
        value: "pending",
      },
      {
        text: "Completed",
        value: "completed",
      },
    ],
    []
  );

  const loadTodo = useCallback(async (ft) => {
    try {
      dispatch({ type: "LOAD_TODO_REQUEST" });
      let url = "http://localhost:3004/todoList";
      if (ft !== "all") {
        url = `${url}?isDone=${ft === "completed"}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      dispatch({
        type: "LOAD_TODO_SUCCESS",
        payload: { todoList: json, filterType: ft },
      });
    } catch (error) {
      dispatch({
        type: "LOAD_TODO_FAIL",
        payload: { hasError: error },
      });
    }
  }, []);

  useEffect(() => {
    loadTodo("all");
  }, [loadTodo]);

  return {
    addTodo,
    toggleComplete,
    deleteTodo,
    loadTodo,
    filterBtns,
    todoState,
    todoTextRef,
  };
};

export default useTodo;