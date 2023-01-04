import React, { useEffect, useState } from "react";
import HeaderComponent from "./Header";
import { Layout, Drawer, Menu, Space, Spin } from "antd";
import Sidebar from "./SideBar";
import styles from "./PrivateLayout.module.scss";
import { menuData } from "./SideBar/SideBarData";
import FooterLayout from "./Footer";
import CnBlackLogo from "../../../src/assets/images/cn-black.svg";
import useWindowSize from "../../utils/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/Auth/AuthAction";
import {
  userDataSelector,
  userLoadingSelector,
} from "../../redux/Auth/AuthSelector";
import { useNavigate } from "react-router";
const { Header, Content, Footer } = Layout;

const PrivateLayout = ({ children }) => {
  const { width } = useWindowSize();
  const [collapsed, setCollapsed] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement] = useState("left");
  const navigate=useNavigate()
  const [loading, setLoading] = useState(true);
  const userLoading = useSelector(userLoadingSelector);
  const userData = useSelector(userDataSelector);
  const dispatch = useDispatch();

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userLoading) return setLoading(true);
    const myTimeout = setTimeout(setLoading(false), 1000);
    clearTimeout(myTimeout);
  }, [userLoading]);

  useEffect(() => {
    if (width < 992) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
      setOpen(false);
    }
  }, [width]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (loading)
    return (
      <div className={styles.loadingFullPage}>
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    );

  return (
    <div className={styles.layoutContainer}>
      <Header>
        <HeaderComponent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          lightMode={lightMode}
          setLightMode={setLightMode}
          setOpen={setOpen}
        />
      </Header>
      <div
        className={
          collapsed ? styles.collapseContainerWrapper : styles.containerWrapper
        }
      >
        <Layout>
          <Drawer
            title={<img src={CnBlackLogo} alt="title" />}
            placement={placement}
            closable={true}
            onClose={onClose}
            open={open}
            key={placement}
          >
            <Menu
              theme={!lightMode ? "light" : "dark"}
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={menuData}
              style={{ minHeight: " calc(100vh - 64px)" }}
              onClick={(value) => {
                const findData = menuData.find(
                  (element) => element.key === +value.key
                );
                navigate(findData.route);
              }}
            />
          </Drawer>
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            lightMode={lightMode}
          />
          <Content className={styles.contentWrapper}>
            {children}
            <Footer style={{ textAlign: "center" }}>
              <FooterLayout />
            </Footer>
          </Content>
        </Layout>
      </div>
    </div>
  );
};

export default PrivateLayout;
