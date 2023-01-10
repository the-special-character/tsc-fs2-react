import React, { createContext, useReducer } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import cartReducer, { cartInitialState } from "../reducers/cartReducer";
import axiosInstance from "../utils/axiosInstance";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, cartInitialState);

  const loadCart = useCallback(async () => {
    try {
      dispatch({ type: "LOAD_CART_REQUEST" });
      const res = await axiosInstance.get("660/cart");
      dispatch({ type: "LOAD_CART_SUCCESS", payload: res });
    } catch (error) {
      dispatch({ type: "LOAD_CART_FAIL", payload: error });
      if (error.message === "Please Log in again") {
        logOut();
      }
    }
  }, []);

  const addCart = useCallback(async (data) => {
    try {
      dispatch({ type: "ADD_CART_REQUEST" });
      const res = await axiosInstance.post("660/cart", data);
      dispatch({ type: "ADD_CART_SUCCESS", payload: res });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ADD_CART_FAIL", payload: error });
    }
  }, []);

  const updateCart = useCallback(async (data) => {
    try {
      dispatch({ type: "UPDATE_CART_REQUEST" });
      const res = await axiosInstance.put(`660/cart/${data.id}`, data);
      dispatch({ type: "UPDATE_CART_SUCCESS", payload: res });
    } catch (error) {
      dispatch({ type: "UPDATE_CART_FAIL", payload: error });
    }
  }, []);

  const deleteCart = useCallback(async (data) => {
    try {
      dispatch({ type: "DELETE_CART_REQUEST" });
      await axiosInstance.delete(`660/cart/${data.id}`, data);
      dispatch({ type: "DELETE_CART_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "DELETE_CART_FAIL", payload: error });
    }
  }, []);

  const value = useMemo(
    () => ({
      cartState,
      loadCart,
      addCart,
      updateCart,
      deleteCart,
    }),
    [cartState]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
