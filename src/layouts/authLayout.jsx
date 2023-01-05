import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";

const AuthLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div>
            <p>{theme}</p>
            <button type="button" onClick={toggleTheme}>
              Toggle Theme
            </button>
          </div>
        )}
      </ThemeContext.Consumer> */}
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
