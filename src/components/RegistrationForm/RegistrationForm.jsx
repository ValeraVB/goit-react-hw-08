import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors"; // Предположим, что у вас есть селектор для получения ошибок авторизации
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError); // Для отображения ошибок сервера

  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(signup(values))
      .unwrap() // Разворачиваем результат, чтобы обработать ошибки
      .catch((error) => {
        console.error("Registration error:", error); // Можно также добавить отображение ошибки
      })
      .finally(() => {
        setSubmitting(false); // Сбрасываем состояние отправки
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <h1 className={css.title}>Register your account</h1>
          {authError && (
            <div className={css.error}>Error: {authError}</div>
          )}{" "}
          {/* Показ ошибки от сервера */}
          <label className={css.label}>
            Username
            <Field type="text" name="name" className={css.input} />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            Email
            <Field type="email" name="email" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.input} />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </label>
          <button type="submit" disabled={isSubmitting} className={css.button}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
