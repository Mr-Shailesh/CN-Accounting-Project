import React from "react";
import Logo from "../../../../components/atoms/Logo";
import classes from "./styles.module.scss";

const AuthHeader = () => {
  return (
    <div className={classes.logowrapper}>
      <Logo />
    </div>
  );
};

export default AuthHeader;
