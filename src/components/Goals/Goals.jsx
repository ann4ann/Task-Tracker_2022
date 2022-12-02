import styles from "./Goals.module.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import GoalCard from "./GoalCard";
import { Link } from "react-router-dom";
import ModalConfirm from "../UI/ModalConfirm";
import { useNavigate } from "react-router-dom";

const Goals = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const defaultModalData = {
    showModal: false,
    title: "",
    id: "",
  };
  const [modalData, setModalData] = useState(defaultModalData);

  const [goals, setGoals] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/goal/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    // sendRequest().then((data) => console.log(data));
    sendRequest().then((data) => setGoals(data.goals.goals));
  }, [modalData]);

  // УДАЛЕНИЕ ЦЕЛИ
  const deleteRequest = async (id) => {
    const res = await axios
      .delete(`http://localhost:5000/api/goal/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = (id, title) => {
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
    deleteRequest(modalData.id).then(() => setModalData(defaultModalData));
  };

  // РЕДАКТИРОВАНИЕ ЦЕЛИ
  const handleEdit = (id) => {
    navigate(`/goal/${id}`);
  };

  return (
    <div className={styles.container}>
      <ModalConfirm
        showModal={modalData.showModal}
        onClose={onClose}
        onSubmit={onSubmit}
        title={modalData.title}
        descripton="Удалить цель?"
      />
      <Link className={styles.btn} to="/goals/add">
        <button>Новая цель</button>
      </Link>
      <div className={styles["cards-wrapper"]}>
        {goals &&
          goals.map((goal) => (
            <GoalCard
              goal={goal}
              key={goal._id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
      </div>
    </div>
  );
};

export default Goals;
