import classes from "./styles.module.scss";
import React from "react";
import Logo from "../../../../components/atoms/Logo";
import authScreens from "../../../../../src/assets/images/auth-screens.png";
import { Typography } from "antd";
const { Title } = Typography;

const AuthHeroSection = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.logowrapper}>
        <Logo />
      </div>
      <div className={classes.imagewrapper}>
        <img alt="auth-screens" src={authScreens} />
      </div>

      <div className={classes.textwrapper}>
        <Title className={classes.title}>Fast, Efficient and Productive</Title>
        <div className={classes.paragraphwrapper}>
          <span>
            In this kind of post,the blogger introduces a person they’ve
            interviewed
          </span>
          <br />
          <span>
            and provides some background information about the interviewee and
            their{" "}
          </span>
          <br />
          <span>work following this is a transcript of the interview.</span>
        </div>
      </div>
    </div>
  );
};

export default AuthHeroSection;
