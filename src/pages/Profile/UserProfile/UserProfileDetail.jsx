import React from "react";
import styles from "./UserProfile.module.scss";

const UserProfileDetail = ({ title, value }) => {
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.titleWrapper}>{title}</div>
      <div className={styles.valueWrapper}>{value}</div>
    </div>
  );
};

export default UserProfileDetail;
