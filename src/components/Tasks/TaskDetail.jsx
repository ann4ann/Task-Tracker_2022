import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./TaskDetail.module.scss";
import { estimatedDurations } from "./estimatedDurations";
import convertToOptions from "../utils/convertToOptions";

const TaskDetail = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [goalsOptions, setGoalsOptions] = useState();
  const [inputs, setInputs] = useState({});

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/task/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

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
  }, []);
  useEffect(() => {
    fetchDetails().then((data) => {
      setInputs((prevState) => ({
        ...prevState,
        title: data.task.title,
        description: data.task.description,
        isCompleted: data.task.isCompleted,
        isImportant: data.task.isImportant,
        isUrgent: data.task.isUrgent,
        deadline: data.task.deadline && data.task.deadline.substring(0, 10),
        estimatedDuration: data.task.estimatedDuration,
        durationInWork: data.task.durationInWork,
        goal: data.task.goal,
        // defaultGoalId: data.task.goal,
      }));
    });
  }, [id, goalsOptions]);

  const handleChange = (e) => {
    function getValue(name) {
      if (
        name === "isImportant" ||
        name === "isUrgent" ||
        name === "isCompleted"
      ) {
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
    // console.log(inputs)
    const res = await axios.put(`http://localhost:5000/api/task/update/${id}`, {
      title: inputs.title,
      description: inputs.description || undefined,
      isCompleted: inputs.isCompleted,
      isImportant: inputs.isImportant,
      isUrgent: inputs.isUrgent,
      deadline: inputs.deadline || undefined,
      estimatedDuration: inputs.estimatedDuration || undefined,
      durationInWork: inputs.durationInWork || undefined,
      user: localStorage.getItem("userId"),
      goal: inputs.goal || undefined,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest().then(() => navigate("/tasks"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Изменить задачу</h2>
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
            value={inputs.goal}
            onChange={handleChange}
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
            value={inputs.estimatedDuration || 0}
            onChange={handleChange}
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

        <div className={styles["form-wrapper"]}>
          <label htmlFor="durationInWork">Уже затрачено времени (минут)</label>
          <input
            type="number"
            min="0"
            max="600"
            step="10"
            className={styles["form-wrapper__control"]}
            name="durationInWork"
            onChange={handleChange}
            value={inputs.durationInWork}
            placeholder="Ваша задача"
            id="durationInWork"
          />
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
            Выполнена
          </label>
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

export default TaskDetail;
