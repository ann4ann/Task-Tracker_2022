import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AddGoal.module.scss";
import axios from "axios";

const AddGoal = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    isMainGoal: false,
    reward: "",
  });
  const handleChange = (e) => {
    function getValue(name) {
      if (name === "isMainGoal") {
        return e.target.checked ? true : false;
      }
      return e.target.value;
    }
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: getValue(e.target.name),
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/goal/add", {
        title: inputs.title,
        description: inputs.description,
        isMainGoal: inputs.isMainGoal,
        reward: inputs.reward,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    // sendRequest().then((data) => console.log(data));
    sendRequest().then(() => navigate("/goals"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Создать новую цель</h2>
        <div className={styles["form-wrapper"]}>
          <label htmlFor="title">Название цели</label>
          <input
            type="text"
            className={styles["form-wrapper__control"]}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            placeholder="Ваша цель"
            id="title"
          />
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="description">Описание цели</label>
          <textarea
            type="text"
            className={styles["form-wrapper__control-area"]}
            name="description"
            onChange={handleChange}
            value={inputs.description}
            placeholder="Опишите вашу цель"
            id="description"
          />
        </div>

        <div className={styles["checkbox-wrapper"]}>
          <input
            type="checkbox"
            className={styles["chechbox-field"]}
            name="isMainGoal"
            onChange={handleChange}
            checked={inputs.isMainGoal}
            id="isMainGoal"
          />
          <label htmlFor="isMainGoal" className={styles["checkbox-label"]}>
            Главная цель
          </label>
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="reward">Награда</label>
          <textarea
            type="text"
            className={styles["form-wrapper__control-area"]}
            name="reward"
            onChange={handleChange}
            value={inputs.reward}
            placeholder="Что вы получите, когда выполните цель?"
            id="reward"
          />
        </div>

        <button className={styles["button-submit"]} type="submit">
          Подтвердить
        </button>
        <Link className={styles.btn} to="/goals">
          <button>Назад</button>
        </Link>
      </form>
    </div>
  );
};

export default AddGoal;
