import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AddTask.module.scss";
import { estimatedDurations } from "./estimatedDurations";
import convertToOptions from "../utils/convertToOptions";

const AddTask = () => {
  const navigate = useNavigate();
  const [goalsOptions, setGoalsOptions] = useState();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    isImportant: false,
    isUrgent: false,
    deadline: "",
    estimatedDuration: "",
    goal: null,
  });

  //   ПОЛУЧАЕМ ЦЕЛИ
  const getGoals = async () => {
    const res = await axios
      .get(
        `http://localhost:5000/api/goal/user/${localStorage.getItem("userId")}`
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    // getGoals().then((data) => console.log("GOALS:", data.goals.goals));
    getGoals().then((data) =>
      setGoalsOptions(convertToOptions(data.goals.goals))
    );
  }, [goalsOptions]);

  const handleChange = (e) => {
    function getValue(name) {
      if (name === "isImportant" || name === "isUrgent") {
        return e.target.checked ? true : false;
      } else if (name === "deadline") {
        return e.target.value.substring(0, 10);
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
      .post("http://localhost:5000/api/task/add", {
        title: inputs.title,
        description: inputs.description || undefined,
        isImportant: inputs.isImportant,
        isUrgent: inputs.isUrgent,
        deadline: inputs.deadline || undefined,
        estimatedDuration: inputs.estimatedDuration || undefined,
        user: localStorage.getItem("userId"),
        goal: inputs.goal || undefined,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    // sendRequest().then((data) => console.log(data));
    sendRequest().then(() => navigate("/tasks"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Создать новую задачу</h2>
        <div className={styles["form-wrapper"]}>
          <label htmlFor="title">Название задачи</label>
          <input
            type="text"
            className={styles["form-wrapper__control"]}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            placeholder="Ваша задача"
            id="title"
          />
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="goal">Цель</label>
          <select
            className={styles["form-wrapper__control"]}
            name="goal"
            onChange={handleChange}
            // value={inputs.goal}
            id="goal"
          >
            <option value="">Без цели</option>
            {goalsOptions &&
              goalsOptions.map((goal) => (
                <option value={goal.value} key={goal.value}>
                  {goal.text}
                </option>
              ))}
          </select>
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="description">Описание задачи</label>
          <textarea
            type="text"
            className={styles["form-wrapper__control-area"]}
            name="description"
            onChange={handleChange}
            value={inputs.description}
            placeholder="Опишите вашу задачу"
            id="description"
          />
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="estimatedDuration">Предполагаемая длительность</label>
          <select
            className={styles["form-wrapper__control"]}
            name="estimatedDuration"
            onChange={handleChange}
            // value={inputs.goal}
            id="estimatedDuration"
          >
            {estimatedDurations.map((duration) => (
              <option
                value={duration.value}
                key={duration.value + duration.text}
              >
                {duration.text}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["checkbox-wrapper"]}>
          <input
            type="checkbox"
            className={styles["chechbox-field"]}
            name="isImportant"
            onChange={handleChange}
            checked={inputs.isImportant}
            id="isImportant"
          />
          <label htmlFor="isImportant" className={styles["checkbox-label"]}>
            Это важная задача
          </label>
        </div>
        <div className={styles["checkbox-wrapper"]}>
          <input
            type="checkbox"
            className={styles["chechbox-field"]}
            name="isUrgent"
            onChange={handleChange}
            checked={inputs.isUrgent}
            id="isUrgent"
          />
          <label htmlFor="isUrgent" className={styles["checkbox-label"]}>
            Это срочная задача
          </label>
        </div>

        <div className={styles["form-wrapper"]}>
          <label htmlFor="deadline">Дедлай</label>
          <input
            type="date"
            className={styles["form-wrapper__control"]}
            name="deadline"
            onChange={handleChange}
            value={inputs.deadline}
            id="deadline"
          />
        </div>

        <button className={styles["button-submit"]} type="submit">
          Подтвердить
        </button>
        <Link className={styles.btn} to="/tasks">
          <button>Назад</button>
        </Link>
      </form>
    </div>
  );
};

export default AddTask;
