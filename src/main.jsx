import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import ErrorBoundary from "./ErrorBoundary";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./main.css";
import Home from "./pages/home";
import Products from "./pages/products";
import Login from "./pages/login";
import Register from "./pages/register";
import MainLayout from "./layouts/mainLayout";
import AuthLayout from "./layouts/authLayout";
import { ThemeProvider } from "./context/themeContext";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/products",
//     element: <Products />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </ThemeProvider>
);
