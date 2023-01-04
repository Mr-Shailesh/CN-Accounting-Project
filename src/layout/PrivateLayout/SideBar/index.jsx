import React, { useEffect, useState } from "react";
import styles from "./SideBar.module.scss";
import { Layout, Menu } from "antd";
import { menuData } from "./SideBarData";
import { useLocation, useNavigate } from "react-router";
const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed, lightMode }) => {
  const navigate = useNavigate();
  const [tabKey, setTabKey] = useState("0");
  const location = useLocation();
  useEffect(() => {
    const findData = menuData.find(
      (element) => element.route === location.pathname
    );
    setTabKey(findData?.key);
  }, [tabKey]);

  return (
    <div
      className={
        collapsed ? styles.collapseSidebarWrapper : styles.sidebarWrapper
      }
    >
      <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu
          theme={!lightMode ? "light" : "dark"}
          mode="inline"
          defaultSelectedKeys={[tabKey]}
          selectedKeys={[tabKey]}
          items={menuData}
          style={{ minHeight: " calc(100vh - 64px)" }}
          onClick={(value) => {
            const findData = menuData.find(
              (element) => element.key === value.key
            );
            setTabKey(value?.key);
            navigate(findData?.route);
          }}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
