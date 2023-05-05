import React from "react";

const SelectComponent = ({ selectOption, name, formik }) => {
  return (
    <div className="formControl">
      <select {...formik.getFieldProps(name)} name={name}>
        {selectOption.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default SelectComponent;
