import React from "react";
import { Row, Col } from "antd";
import LoginHeader from "../component/AuthHeader";
import classes from "./styles.module.scss";

import LoginHeroSection from "../component/AuthHeroSection";

import SignUpForm from "./signUpForm";

const Signup = () => {
  return (
    <div className={classes.container}>
      <Row className={classes.row}>
        <Col lg={12} xs={24} className={classes.column}>
          <LoginHeader />
          <div className={classes.section}>
            <h1>Sign Up</h1>
            <SignUpForm />
          </div>
        </Col>
        <Col lg={12} xs={24} className={classes.rightSection}>
          <LoginHeroSection />
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
