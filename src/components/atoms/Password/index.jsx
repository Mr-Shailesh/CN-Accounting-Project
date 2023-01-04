import { Input, Form } from "antd";
import React from "react";
import classes from "./styles.module.scss";
const CustomPassword = (props) => {
  const { name, rules, className, ...rest } = props;
  return (
    <div className={classes.password}>
      <Form.Item name={name} rules={rules} className={classes.formItem}>
        <Input.Password {...rest} className={className} name={name} />
      </Form.Item>
    </div>
  );
};

export default CustomPassword;
