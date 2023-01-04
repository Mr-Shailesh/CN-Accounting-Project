import React from "react";
import { Dropdown } from "antd";
import styles from "./Notification.module.scss";
import { BellOutlined } from "@ant-design/icons";

const Notification = () => {
  const handleProfileClick = () => {};
  const items = [
    {
      key: 1,
      label: (
        <div className={styles.modelWrapper} onClick={handleProfileClick}>
          <div className={styles.userImg}> </div>
          Notification 1
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: 2,
      label: (
        <div className={styles.modelWrapper}>
          <div className={styles.userImg}> </div>
          Notification 2
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: 3,
      label: (
        <div className={styles.modelWrapper}>
          <div className={styles.userImg}> </div>
          Notification 3
        </div>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
      placement="topRight"
      style={{ minWidth: "500px" }}
      overlayClassName={styles.mainContainer}
    >
      <div className={styles.userProfile}>
        <BellOutlined />
      </div>
    </Dropdown>
  );
};
export default Notification;
