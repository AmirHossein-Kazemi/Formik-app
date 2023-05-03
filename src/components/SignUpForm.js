import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  number: "",
  password: "",
  passConfrim: "",
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
    .required("Name is Required"),
  number: Yup.string()
    .required("Name is Required")
    .matches(/^[0-9]{11}$/, "invalid phone number")
    .nullable(),
  password: Yup.string().required("Name is Required"),
  passConfrim: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password Confirmation is Required"),
});

const SignUpForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input type="text" {...formik.getFieldProps("name")} name="name" />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input type="email" name="email" {...formik.getFieldProps("email")} />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label>Number</label>
          <input
            type="text"
            name="number"
            {...formik.getFieldProps("number")}
          />
          {formik.errors.number && formik.touched.number && (
            <div className="error">{formik.errors.number}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password Confirmation</label>
          <input
            type="password"
            name="passConfrim"
            {...formik.getFieldProps("passConfrim")}
          />
          {formik.errors.passConfrim && formik.touched.passConfrim && (
            <div className="error">{formik.errors.passConfrim}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
