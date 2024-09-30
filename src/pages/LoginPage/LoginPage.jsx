import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <h1>Please log in</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
