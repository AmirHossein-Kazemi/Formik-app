import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import Input from "./common/Input";
import RadioButton from "./common/RadioButton";
import SelectComponent from "./common/SelectComponent";
import CheckBox from "./common/CheckBox";
import React from "react";
import BooleanCheckBox from "./common/BooleanCheckBox";

const checkBoxOptions = [
  { value: "React", label: "React.js" },
  { value: "Node", label: "Node.js" },
  { value: "Vue", label: "Vue.js" },
];

const radioOptions = [
  { value: "0", label: "Male" },
  { value: "1", label: "Female" },
];

const selectOptions = [
  { value: "", label: "Select Nationality" },
  { value: "IR", label: "Iran" },
  { value: "FA", label: "France" },
  { value: "GER", label: "Germany" },
];

const initialValues = {
  name: "",
  email: "",
  number: "",
  password: "",
  passConfirm: "",
  gender: "",
  nationality: "",
  intersts: [],
  terms: false,
};

const onSubmit = (s) => {
  console.log(s);
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is Required")
    .min(2, "name is too short 2 at least"),
  email: Yup.string()
    .email("invalid email format")
    .required("Email is Required"),
  number: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{8,}$/, "invalid phone number")
    .nullable(),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*?])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password Confirmation is Required"),
  gender: Yup.string().required("Gender is Required"),
  nationality: Yup.string().required("Select an Option"),
  intersts: Yup.array().min(1).required("atleast select one expertise"),
  terms: Yup.boolean()
    .required("the terms and the condition must be accepted")
    .oneOf([true], "the terms and the condition must be accepted"),
});

const SignUpForm = () => {
  const [formValue, setFormValue] = useState(null);

  const onSubmit = (values) => {
    axios
      .post("http://localhost:3001/users", values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: formValue || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => {
        setFormValue(res.data);
      })
      .catch();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input name="name" formik={formik} label="Name" />
        <Input name="email" formik={formik} label="Email" type="email" />
        <Input name="number" formik={formik} label="Phone Number" />
        <Input
          name="password"
          formik={formik}
          label="Password"
          type="password"
        />
        <Input
          name="passConfirm"
          formik={formik}
          label="Password Confirmation"
          type="password"
        />
        <RadioButton
          formik={formik}
          name="gender"
          radioOptions={radioOptions}
        />
        <SelectComponent
          selectOption={selectOptions}
          name="nationality"
          formik={formik}
        />
        <CheckBox
          checkBoxOptions={checkBoxOptions}
          name="intersts"
          formik={formik}
        />
        <BooleanCheckBox formik={formik} />
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
