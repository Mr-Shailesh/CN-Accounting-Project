import React from "react";
import styles from "./Header.module.scss";
import { Input } from "antd";
import MenuUnfoldOutlined from "@ant-design/icons/lib/icons/MenuUnfoldOutlined";
import MenuFoldOutlined from "@ant-design/icons/lib/icons/MenuFoldOutlined";
import Mode from "./Mode";
import ProfileModel from "./ProfileModel";
import cls from "classnames";
import Notification from "./Notification";
import CnBlackLogo from "../../../assets/images/cn-black.svg";
import CnWhiteLogo from "../../../assets/images/cn-white.svg";
import useWindowSize from "../../../utils/useWindowSize";

const HeaderLayout = ({
  collapsed,
  setCollapsed,
  lightMode,
  setLightMode,
  setOpen,
}) => {
  const { width } = useWindowSize();
  const handleModeClick = () => {
    setLightMode(!lightMode);
  };
    return (
    <div
      className={
        !lightMode
          ? cls(styles.headerContainer, styles.light)
          : cls(styles.headerContainer, styles.dark)
      }
    >
      <div className={styles.logo}>
        <img src={!lightMode ? CnBlackLogo : CnWhiteLogo} alt="logo" />
      </div>
      <div className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.menu}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => {
                  width > 992 ? setCollapsed(!collapsed) : setOpen(true);
                },
              }
            )}
          </div>
          <div className={styles.search}>
            <Input placeholder="Search" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.icon}>
            <Notification />
            <Mode lightMode={lightMode} handleModeClick={handleModeClick} />
          </div>
          <div>
            <ProfileModel />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderLayout;
