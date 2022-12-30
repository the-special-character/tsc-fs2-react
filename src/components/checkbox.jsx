import React from "react";

const Checkbox = ({
  field: { name, value, onChange, onBlur }, //
  form: { touched, errors, setFieldValue, setFieldTouched },
  meta,
  options,
  className,
  ...props
}) => {
  console.log(value);
  return (
    <div>
      <fieldset>
        <legend>Hobies</legend>
        {options.map((x) => (
          <div key={x.id}>
            <input
              type="checkbox"
              name={name}
              id={x.id}
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

export default Checkbox;
