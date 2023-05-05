import React from "react";

const BooleanCheckBox = ({ formik }) => {
  return (
    <div className="formControl">
      <input
        type="checkbox"
        id="terms"
        value={true}
        name="terms"
        onChange={formik.handleChange}
        checked={formik.values.terms}
      />
      <label htmlFor="terms">Terms and Conditions</label>

      {formik.errors.terms && formik.touchedterms && (
        <div className="error">{formik.errors.terms}</div>
      )}
    </div>
  );
};

export default BooleanCheckBox;
