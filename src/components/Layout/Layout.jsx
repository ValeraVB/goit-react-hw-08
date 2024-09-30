import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import styles from "./Layout.module.css";

const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Получаем состояние аутентификации

  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.leftSection}>
            <a href="/">Home</a>
            {isLoggedIn && <a href="/contacts">Contacts</a>}{" "}
            {/* Показываем "Contacts" только если пользователь вошел в систему */}
          </div>
          <div className={styles.rightSection}>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
