import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(signup(values));
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Username
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className={css.error} />
        </label>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
