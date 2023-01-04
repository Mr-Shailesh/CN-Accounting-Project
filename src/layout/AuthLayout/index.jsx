import React from "react";
import { Layout } from "antd";
import classes from "./styles.module.scss";

const AuthLayout = (props) => {
  return (
    <Layout className={classes.layout}>
      <div className={classes.content}>{props.children}</div>
    </Layout>
  );
};

export default AuthLayout;
