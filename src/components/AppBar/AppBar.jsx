import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import { NavLink } from "react-router-dom";
import css from "./AppBar.module.css";

const AppBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={css.appBar}>
      <nav className={css.nav}>
        <div className={css.leftSection}>
          <NavLink to="/" className={css.navLink}>
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/contacts" className={css.navLink}>
              Contacts
            </NavLink>
          )}
        </div>

        <div className={css.rightSection}>
          {isLoggedIn ? (
            <div className={css.userMenu}>
              <span>Welcome, {user.name}!</span>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className={css.authNav}>
              <NavLink to="/login" className={css.navLink}>
                Login
              </NavLink>
              <NavLink to="/register" className={css.navLink}>
                Register
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
