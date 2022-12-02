import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import TaskCard from "./TaskCard";
import styles from "./Tasks.module.scss";
import ModalConfirm from "../UI/ModalConfirm";

const Tasks = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const defaultModalData = {
    showModal: false,
    title: "",
    id: "",
  };
  const [modalData, setModalData] = useState(defaultModalData);

  const [tasks, setTasks] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/task/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data.tasks);
    return data;
  };
  useEffect(() => {
    // sendRequest().then((data) => console.log(data));
    sendRequest().then((data) => setTasks(data.tasks.tasks));
    // console.log("updated, oops")
  }, [modalData]);

  // РЕДАКТИРОВАНИЕ ЦЕЛИ
  const handleEdit = (id) => {
    // console.log("Hi im edit", id);
    navigate(`/task/${id}`);
  };

  // УДАЛЕНИЕ ЦЕЛИ
  const deleteRequest = async (id) => {
    const res = await axios
      .delete(`http://localhost:5000/api/task/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = (id, title) => {
    // console.log("Hi im delete", id);
    setModalData({
      showModal: true,
      title: title,
      id: id,
    });
  };
  // КНОПКИ МОДАЛКИ
  const onClose = () => {
    setModalData(defaultModalData);
  };
  const onSubmit = () => {
    console.log("deleteDelete");
    deleteRequest(modalData.id).then(() => setModalData(defaultModalData));
  };

  return (
    <div className={styles.container}>
      <ModalConfirm
        showModal={modalData.showModal}
        onClose={onClose}
        onSubmit={onSubmit}
        title={modalData.title}
        descripton="Удалить задачу?"
      />
      {/* Добавить задачу */}
      <div className={styles.container__add}>
        <Link className={styles.btn} to="/tasks/add">
          <FaPlus />
        </Link>
      </div>

      {/* Важно срочно */}
      <div className={styles.container__item}>
        <div className={styles["area-wrapper"]}>
          <div className={styles.area}>
            {tasks &&
              tasks
                .filter(
                  (task) =>
                    !task.isCompleted && task.isImportant && task.isUrgent
                )
                .map((task) => (
                  <TaskCard
                    task={task}
                    key={task._id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
          </div>
        </div>
      </div>
      {/* Важно несрочно */}
      <div className={styles.container__item}>
        <div className={styles["area-wrapper"]}>
          <div className={styles.area}>
            {tasks &&
              tasks
                .filter(
                  (task) =>
                    !task.isCompleted && task.isImportant && !task.isUrgent
                )
                .map((task) => (
                  <TaskCard
                    task={task}
                    key={task._id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
          </div>
        </div>
      </div>
      {/* Неажно срочно */}
      <div className={styles.container__item}>
        <div className={styles["area-wrapper"]}>
          <div className={styles.area}>
            {tasks &&
              tasks
                .filter(
                  (task) =>
                    !task.isCompleted && !task.isImportant && task.isUrgent
                )
                .map((task) => (
                  <TaskCard
                    task={task}
                    key={task._id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
          </div>
        </div>
      </div>
      {/* Неажно несрочно */}
      <div className={styles.container__item}>
        <div className={styles["area-wrapper"]}>
          <div className={styles.area}>
            {tasks &&
              tasks
                .filter(
                  (task) =>
                    !task.isCompleted && !task.isImportant && !task.isUrgent
                )
                .map((task) => (
                  <TaskCard
                    task={task}
                    key={task._id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
