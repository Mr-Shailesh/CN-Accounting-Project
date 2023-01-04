import React from "react";
import { Button as BaseButton } from "antd";
import classes from "./styles.module.scss";
const Button = (props) => {
  const { children, className, loading, disabled, ...rest } = props;
  return (
    <div className={classes.button}>
      <BaseButton
        loading={loading}
        className={className}
        disabled={disabled || loading}
        {...rest}
        size="large"
      >
        {children}
      </BaseButton>
    </div>
  );
};

export default Button;
