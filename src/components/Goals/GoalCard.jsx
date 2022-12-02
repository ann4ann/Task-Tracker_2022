import React from "react";
import styles from "./Goals.module.scss";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const GoalCard = ({ goal, onDelete, onEdit }) => {
  function cardStyle() {
    if (goal.isCompleted) {
      return "completed-card";
    }
    return goal.isMainGoal ? "main-card" : "standart-card";
  }

  return (
    <div className={styles[`${cardStyle()}`]}>
      <div className={styles["card-wrapper"]}>
        <div className={styles[`${cardStyle()}__header`]}>
          <div>{goal.title}</div>
          <div className={styles["header-icons"]}>
            <FaEdit onClick={() => onEdit(goal._id)} />
            <FaTrashAlt onClick={() => onDelete(goal._id, goal.title)} />
          </div>
        </div>
        <div className={styles[`${cardStyle(goal.isMainGoal)}__body`]}>
          {goal.isCompleted && (
            <div className={styles.completed}>завершена</div>
          )}
          <div>{goal.description && `Описание: ${goal.description}`}</div>
          <div>{goal.reward && `Награда: ${goal.reward}`}</div>
        </div>
        <div className={styles[`${cardStyle(goal.isMainGoal)}__footer`]}>
          Задачи для цели
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
