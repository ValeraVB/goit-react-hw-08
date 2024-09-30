import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import styles from "./RestrictedRoute.module.css";

const RestrictedRoute = ({ children, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? (
    <Navigate to={redirectTo} />
  ) : (
    <div className={styles.restrictedRoute}>{children}</div>
  );
};

export default RestrictedRoute;
