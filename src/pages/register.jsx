import React from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Field, Form, Formik } from "formik";
import TextInput from "../components/textInput";
import Select from "../components/select";
import Checkbox from "../components/checkbox";
import Radio from "../components/radio";

const fields = [
  {
    component: TextInput,
    id: "name",
    name: "name",
    autoComplete: "name",
    placeholder: "Name",
    className: "rounded-t-md",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: Radio,
    id: "gander",
    name: "gander",
    autoComplete: "gender",
    placeholder: "Please Select Gender from list",
    options: [
      {
        id: "male",
        label: "Male",
      },
      {
        id: "female",
        label: "Female",
      },
      {
        id: "other",
        label: "Other",
      },
    ],
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: Checkbox,
    id: "hobbies",
    name: "hobbies",
    placeholder: "Hobbies",
    options: [
      {
        id: "cricket",
        label: "Cricket",
      },
      {
        id: "dance",
        label: "Dance",
      },
    ],
    validate: (value) => {
      if (value.length === 0) return "Required...";
      return "";
    },
  },
  {
    component: TextInput,
    id: "age",
    name: "age",
    type: "number",
    autoComplete: "age",
    placeholder: "Age",
    min: 18,
    max: 100,
    validate: (value) => {
      if (!value) return "Required...";
      if (Number(value) < 18) return "min number shuld greater then 18";
      if (Number(value) > 100) return "min number shuld less then 100";
      return "";
    },
  },
  {
    component: TextInput,
    id: "email-address",
    name: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "Email address",
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
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
  {
    component: TextInput,
    id: "confirm-password",
    name: "confirmPassword",
    type: "password",
    autoComplete: "new-password",
    placeholder: "Confirm Password",
    className: "rounded-b-md",
    validate: (value) => {
      if (!value) return "Required...";
      return "";
    },
  },
];

const Register = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        hobbies: [],
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            {fields.map((x) => (
              <Field key={x.id} {...x} />
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
