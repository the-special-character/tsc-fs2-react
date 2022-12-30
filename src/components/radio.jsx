import React from "react";

const Radio = ({
  field: { name, value }, //
  form: { touched, errors, setFieldValue, setFieldTouched },
  meta,
  options,
  className,
  ...props
}) => {
  return (
    <div>
      <fieldset>
        <legend>Hobies</legend>
        {options.map((x) => (
          <div key={x.id}>
            <input
              type="radio"
              name={name}
              id={x.id}
              checked={value === x.label}
              onChange={() => setFieldValue(name, x.label)}
              onBlur={() => setFieldTouched(name, true)}
            />
            <label htmlFor={x.id}>{x.label}</label>
          </div>
        ))}
      </fieldset>
      {touched[name] && errors[name] && (
        <p className="text-red-500 text-sm mt-2">{errors[name]}</p>
      )}
    </div>
  );
};

export default Radio;
