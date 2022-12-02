import React, { useState } from "react";
import styles from "./Auth.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.name, e.target.value);
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    // console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/goals"));
      // .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/goals"));
      // .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{isSignup ? "Создать аккаунт" : "Войти"}</h2>
        {isSignup && (
          <div className={styles["form-wrapper"]}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              className={styles["form-wrapper__control"]}
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Введите свое имя"
              id="name"
            />
          </div>
        )}
        <div className={styles["form-wrapper"]}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className={styles["form-wrapper__control"]}
            name="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="Адрес электронной почты"
            id="email"
          />
        </div>
        <div className={styles["form-wrapper"]}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className={styles["form-wrapper__control"]}
            name="password"
            onChange={handleChange}
            value={inputs.password}
            placeholder="Введите свой пароль"
            id="password"
          />
        </div>
        <button className={styles["button-submit"]} type="submit">
          Отправить
        </button>
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className={styles["button-change"]}
        >
          {isSignup ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Регистрация"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
