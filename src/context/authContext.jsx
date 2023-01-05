import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

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
      const res = await fetch("http://localhost:3004/register", {
        method: "POST",
        body: JSON.stringify(rest),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json);
      }
      window.localStorage.setItem("token", JSON.stringify(json));
      setUser(json);
      actions.resetForm();
      //   navigate("/");
    } catch (error) {
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
      const res = await fetch("http://localhost:3004/login", {
        method: "POST",
        body: JSON.stringify(rest),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json);
      }
      window.localStorage.setItem("token", JSON.stringify(json));
      actions.resetForm();
      setUser(json);
      //   navigate("/");
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
