import React from "react";
import styles from "./ModalConfirm.module.scss";

const ModalConfirm = ({ showModal, onClose, onSubmit, title, descripton }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div onClick={onClose} className={styles.modal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles["modal-content"]}
      >
        <div className={styles["modal-content__header"]}>
          <h4 className={styles["modal-title"]}>{title}</h4>
        </div>
        <div className={styles["modal-content__body"]}>{descripton}</div>
        <div className={styles["modal-content__footer"]}>
          <button onClick={onClose} className={styles["modal-button"]}>
            Отмена
          </button>
          <button onClick={onSubmit} className={styles["modal-button"]}>Подтвердить</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
