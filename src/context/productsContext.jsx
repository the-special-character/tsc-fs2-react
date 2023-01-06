import React, { createContext } from "react";
import { useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useReducer } from "react";
import {
  productsInitialState,
  productsReducer,
} from "../reducers/productsReducer";
import { useMemo } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productsState, dispatch] = useReducer(
    productsReducer,
    productsInitialState
  );

  const loadProducts = useCallback(async () => {
    try {
      dispatch({ type: "LOAD_PRODUCTS_REQUEST" });
      const res = await axiosInstance.get("660/products");
      dispatch({ type: "LOAD_PRODUCTS_SUCCESS", payload: res });
    } catch (error) {
      dispatch({ type: "LOAD_PRODUCTS_FAIL", payload: error });
    }
  }, []);

  const value = useMemo(
    () => ({
      productsState,
      loadProducts,
    }),
    [productsState]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
