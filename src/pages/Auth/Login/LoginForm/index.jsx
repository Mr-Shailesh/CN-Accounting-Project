import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
import classes from "./styles.module.scss";
import Button from "../../../../components/atoms/Button";
import Input from "../../../../components/atoms/Input";
import AuthLayout from "../../../../layout/AuthLayout";
import Password from "../../../../components/atoms/Password";
import {
  emailRule,
  passwordRule,
} from "../../../../components/helpers/validationRules";
import { NavLink } from "react-router-dom";
import { login } from "../../../../redux/Auth/AuthAction";
import { loginLoadingSelector } from "../../../../redux/Auth/AuthSelector";

const LoginForm = () => {
  const loading = useSelector(loginLoadingSelector);
  const dispatch = useDispatch();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };
  const onFinish = () => {
    dispatch(login({ ...loginFormData, returnSecureToken: true }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes.container}>
      <AuthLayout>
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
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className={classes.inputBox}
            rules={emailRule}
            value={loginFormData.email}
            onChange={handleChange}
          />
          <Password
            name="password"
            type="password"
            placeholder="Password"
            className={classes.inputBox}
            rules={passwordRule}
            value={loginFormData.password}
            onChange={handleChange}
          />

          <div className={classes.forget}>
            <NavLink to="/forgotPassword" className={classes.forgetPassword}>
              Forget Password?
            </NavLink>
          </div>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <div className={classes.buttonWrapper}>
              <Button
                htmlType="submit"
                className={classes.button}
                loading={loading}
              >
                Sign In
              </Button>
            </div>
            <div>
              <p className={classes.member}>
                Not a Member yet?&nbsp;
                <NavLink to="/signUp" className={classes.signUp}>
                  Sign Up
                </NavLink>
              </p>
            </div>
          </Form.Item>
        </Form>
      </AuthLayout>
    </div>
  );
};

export default LoginForm;
