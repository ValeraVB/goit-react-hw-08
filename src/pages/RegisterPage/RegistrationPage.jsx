import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={styles.registrationPage}>
      <h1>Register your account</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
