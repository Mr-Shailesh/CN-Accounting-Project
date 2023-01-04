import React from "react";
import classes from "./styles.module.scss";
import { Row, Col } from "antd";
import AuthHeader from "../component/AuthHeader";
import AuthHeroSection from "../component/AuthHeroSection";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className={classes.container}>
      <Row className={classes.row}>
        <Col lg={12} xs={24} span={12} className={classes.column}>
          <div className={classes.leftSection}>
            <AuthHeader />
            <div className={classes.section}>
              <div className={classes.form}>
                <h1>Reset Password</h1>
                <ResetPasswordForm />
              </div>
            </div>
          </div>
        </Col>
        <Col lg={12} xs={24}>
          <AuthHeroSection />
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
