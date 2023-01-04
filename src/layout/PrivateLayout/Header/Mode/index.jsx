import React from "react";
import styles from "./Mode.module.scss";
import cls from "classnames";
const Mode = ({ lightMode, handleModeClick }) => {
  return (
    <div className={styles.buttonWrapper} onClick={handleModeClick}>
      <div
        className={
          !lightMode ? cls(styles.sunWrapper, styles.night) : styles.sunWrapper
        }
      >
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
        <div className={styles.line4}></div>
      </div>
    </div>
  );
};
export default Mode;
