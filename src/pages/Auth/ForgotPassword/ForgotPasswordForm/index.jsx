import React, { useState } from "react";
import { Form } from "antd";
import classes from "./styles.module.scss";
import Button from "../../../../components/atoms/Button";
import Input from "../../../../components/atoms/Input";
import { useNavigate } from "react-router";
import Modal from "../../../../components/atoms/Modal";
import { emailRule } from "../../../../components/helpers/validationRules";

const ForgotPasswordForm = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <>
      {showModal && (
        <Modal>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            fill="#43fc4b"
            className="bi bi-check-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
          <p>We have send a password reset link to your email.</p>
        </Modal>
      )}
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
        />

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div className={classes.button}>
            <Button className={classes.btnSuccess} onClick={submitHandler}>
              Submit
            </Button>
            <Button className={classes.btnCancel} onClick={cancelHandler}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
