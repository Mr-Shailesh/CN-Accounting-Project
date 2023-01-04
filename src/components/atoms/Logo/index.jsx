import classes from "./styles.module.scss";
import React from "react";
import LogoWhite from "../../../assets/images/cn-white.svg";

const Logo = () => {
  return (
    <div className={classes.logowrapper}>
      <img alt="logo" src={LogoWhite} />
    </div>
  );
};

export default Logo;
