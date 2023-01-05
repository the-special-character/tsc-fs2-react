import React from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { ThemeContext } from "../context/themeContext";
import { Field, Form, Formik } from "formik";
import TextInput from "../components/textInput";
import Checkbox from "../components/checkbox";
import { useNavigate } from "react-router-dom";
import FormikForm from "../components/formikForm";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const fields = [
  {
    component: TextInput,
    id: "email-address",
    name: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "Email address",
    className: "rounded-t-md",
    validate: (value) => {
      if (!value) return "Required...";
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
        return "Please Enter Valid Email";
      return "";
    },
  },
  {
    component: TextInput,
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "new-password",
    placeholder: "Password",
    className: "rounded-b-md",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: Checkbox,
    name: "rememberMe",
    options: [
      {
        id: "rememberMe",
        label: "Remember Me",
      },
    ],
  },
];

const Login = () => {
  const { login } = useContext(AuthContext);

  return (
    <FormikForm
      fields={fields.slice(0, 2)}
      initialValues={{
        email: "",
        password: "",
        rememberMe: [],
      }}
      onSubmit={login}
      btnText="Sign in"
    >
      <div className="flex items-center justify-between">
        <Field {...fields.find((x) => x.name === "rememberMe")} />

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </FormikForm>
  );
};

export default Login;
