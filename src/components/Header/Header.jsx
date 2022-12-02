import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { menu } from "./menu";
import { authActions } from "../../store";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <div className={styles.header}>
      <div className={styles.header__menu}>
        <div className={styles.logo}>Делай дела!</div>
        {isLoggedIn && (
          <ul className={styles.menu}>
            {menu.map((item, index) => (
              <li
                className={styles["menu-item"]}
                key={`menu-item-${index}-${Date.now()}`}
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        className={`${styles.header__authorization} ${styles.authorization}`}
      >
        {!isLoggedIn && (
          <>
            <Link className={styles.authorization__link} to="/auth">
              <button className={styles.authorization__login}>Login</button>
            </Link>
            {"/"}
            <Link className={styles.authorization__link} to="/auth">
              <button className={styles["authorization__sign-up"]}>
                Sign-up
              </button>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <Link className={styles.authorization__link} to="/auth">
            <button
              onClick={() => dispatch(authActions.logout())}
              className={styles["authorization__sign-up"]}
            >
              Logout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
