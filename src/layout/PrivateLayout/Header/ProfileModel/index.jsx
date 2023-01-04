import React from "react";
import { Dropdown,Space } from "antd";
import styles from "./ProfileModel.module.scss";
import {
  EditOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/Auth/AuthAction";

const ProfileModel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user.data);
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const items = [
    {
      key: 1,
      label: (
        <div className={styles.modelWrapper} onClick={handleProfileClick}>
          <EditOutlined style={{ paddingRight: "5px" }} />
          Profile
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div className={styles.modelWrapper}>
          <QuestionCircleOutlined style={{ paddingRight: "5px" }} />
          Help Center
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: 3,
      label: (
        <div className={styles.modelWrapper} onClick={handleLogout}>
          <LogoutOutlined style={{ paddingRight: "5px" }} />
          Sign Out
        </div>
      ),
    },
  ];
  return (
    <div>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            trigger={["click"]}
            overlayClassName={styles.mainContainer}
          >
            <div className={styles.userProfile}>
              <div className={styles.userImg}>
                <span>
                  {userData?.firstName.charAt(0).toUpperCase()}
                  {userData?.lastName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userTitle}>
                  {userData.firstName} {userData.lastName}
                </div>
              </div>
            </div>
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
};

export default ProfileModel;
