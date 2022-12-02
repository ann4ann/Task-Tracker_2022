import React from "react";
import styles from "./TaskCard.module.scss";
import { FaTrashAlt, FaEdit, FaPlay } from "react-icons/fa";

const TaskCard = ({ task, onDelete, onEdit }) => {
  function cardStyle() {
    if (task.isCompleted === true) {
      return "completed-card";
    }
    let style;
    switch (task.isImportant) {
      case true:
        style = task.isUrgent ? "section1-card" : "section2-card";
        break;
      case false:
        style = task.isUrgent ? "section3-card" : "section4-card";
        break;
      default:
        break;
    }
    return style;
  }
  return (
    <div className={styles["card-wrapper"]}>
      <div className={styles[`${cardStyle()}`]}>
        <div className={styles.title}>{task.title}</div>
        <div className={styles.subtitle}>{task.description}</div>
        <div className={styles.footer}>
          <FaTrashAlt onClick={() => onDelete(task._id, task.title)} />
          <FaEdit onClick={() => onEdit(task._id)} />
          <FaPlay />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
