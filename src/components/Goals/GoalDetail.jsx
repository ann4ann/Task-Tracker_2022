import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./GoalDetail.module.scss";

const GoalDetail = () => {
  // const [goal, setGoal] = useState();
  const [inputs, setInputs] = useState({});
  const id = useParams().id;
  const navigate = useNavigate()
  const handleChange = (e) => {
    function getValue(name) {
      if (name === "isMainGoal" || name === "isCompleted") {
        return e.target.checked ? true : false;
      }
      return e.target.value;
    }
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: getValue(e.target.name),
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/goal/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      // setGoal(data.goal);
      setInputs({
        title: data.goal.title,
        description: data.goal.description,
        isMainGoal: data.goal.isMainGoal,
        isCompleted: data.goal.isCompleted,
        reward: data.goal.reward,
      });
    });
  }, [id]);
//   console.log(goal);
  const sendRequest = async () => {
    // console.log(inputs);
    const res = await axios
      .put(`http://localhost:5000/api/goal/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        isMainGoal: inputs.isMainGoal,
        isCompleted: inputs.isCompleted,
        reward: inputs.reward,
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
      {inputs && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Изменить цель</h2>
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

          <div className={styles["checkbox-wrapper"]}>
            <input
              type="checkbox"
              className={styles["chechbox-field"]}
              name="isCompleted"
              onChange={handleChange}
              checked={inputs.isCompleted}
              id="isCompleted"
            />
            <label htmlFor="isCompleted" className={styles["checkbox-label"]}>
              Цель завершена
            </label>
          </div>

          <button className={styles["button-submit"]} type="submit">
            Подтвердить
          </button>
          <Link className={styles.btn} to="/goals">
            <button>Назад</button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default GoalDetail;
