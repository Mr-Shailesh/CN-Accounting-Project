import React from "react";
import { Form, Input } from "antd";
import classes from "./styles.module.scss";
import Button from "../../../../components/atoms/Button";
import Password from "antd/es/input/Password";
import {
  conPasswordRule,
  passwordRule,
} from "../../../../components/helpers/validationRules";

const ResetPasswordForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={classes.form}
    >
      <div className={classes.passwordField}>
        <Password
          name="password"
          rules={passwordRule}
          type="password"
          placeholder="Password"
          className={classes.inputBox}
        />
      </div>
      <div className={classes.passwordField}>
        <Input
          name="conPassword"
          type="password"
          placeholder="Repeat Password"
          className={classes.inputBox}
          rules={conPasswordRule}
        />
      </div>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button className={classes.button}>Reset</Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
