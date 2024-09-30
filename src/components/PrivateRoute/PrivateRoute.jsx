import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; // Используем Navigate
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Если пользователь не авторизован, перенаправляем его на redirectTo
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
