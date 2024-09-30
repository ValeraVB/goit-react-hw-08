import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import "./ContactForm.css";

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    number: Yup.string()
      .required("Number is required")
      .matches(/^\d+$/, "Number must be digits only")
      .min(3, "Number is too short!")
      .max(50, "Number is too long!"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="contact-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <Field
            id="name"
            name="name"
            type="text"
            required
            className="input-field"
          />
          <ErrorMessage name="name" component="div" className="error" />
        </div>
        <div className="input-group">
          <label htmlFor="number">Number</label>
          <Field
            id="number"
            name="number"
            type="tel"
            required
            className="input-field"
          />
          <ErrorMessage name="number" component="div" className="error" />
        </div>
        <button type="submit">Add Contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
