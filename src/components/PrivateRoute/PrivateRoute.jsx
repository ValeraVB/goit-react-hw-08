import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Если пользователь авторизован, возвращаем детей
  // Если не авторизован, перенаправляем на страницу логина
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
