import React from "react";

const RadioButton = ({ formik, name, radioOptions }) => {
  return (
    <div className="formControl">
      {radioOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="radio"
            id={item.value}
            value={item.value}
            name={name}
            onChange={formik.handleChange}
            checked={formik.values[name] === item.value}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      ))}
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default RadioButton;
