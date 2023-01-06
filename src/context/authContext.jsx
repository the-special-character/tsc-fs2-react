import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(token));
    }
  }, []);

  const register = useCallback(async (values, actions) => {
    try {
      console.log(actions);
      const { confirmPassword, ...rest } = values;
      console.log(rest);
      const res = await axiosInstance.post("register", rest);
      window.localStorage.setItem("token", JSON.stringify(res));
      setUser(res);
      actions.resetForm();
    } catch (error) {
      console.log(JSON.stringify(error));
      actions.setErrors({
        serverError: error.message,
      });
    }
  }, []);

  const login = useCallback(async (values, actions) => {
    try {
      console.log(actions);
      const { rememberMe, ...rest } = values;
      console.log(rest);
      const res = await axiosInstance.post("login", rest);
      window.localStorage.setItem("token", JSON.stringify(res));
      setUser(res);
      actions.resetForm();
    } catch (error) {
      actions.setErrors({
        serverError: error.message,
      });
    }
  }, []);

  const logOut = useCallback(() => {
    localStorage.clear();
    setUser(null);
    // navigate("/auth");
  }, []);

  const value = useMemo(
    () => ({
      user,
      register,
      login,
      logOut,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
