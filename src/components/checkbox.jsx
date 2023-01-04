import React from "react";

const Checkbox = ({
  field: { name, value },
  form: { touched, errors, setFieldValue, setFieldTouched },
  options,
  className,
  ...props
}) => {
  console.log(value);
  return (
    <div>
      {options.map((x) => (
        <div key={x.id} className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            id={x.id}
            name={name}
            checked={value.some((y) => y === x.label)}
            onChange={() => {
              if (value.some((y) => y === x.label)) {
                setFieldValue(
                  name,
                  value.filter((z) => z !== x.label)
                );
              } else {
                setFieldValue(name, [...value, x.label]);
              }
            }}
            onBlur={() => {
              setFieldTouched(name, true);
            }}
          />
          <label htmlFor={x.id} className="ml-2 block text-sm text-gray-900">
            {x.label}
          </label>
        </div>
      ))}
      {touched[name] && errors[name] && (
        <p className="text-red-500 text-sm mt-2">{errors[name]}</p>
      )}
    </div>
  );
};

export default Checkbox;
