import { Input as BaseInput, Form } from "antd";
import React from "react";

const Input = (props) => {
  const { name, type, className, rules, id, onChange, ...rest } =
    props;
  return (
    <Form.Item name={name} rules={rules} onChange={onChange}>
      <BaseInput
        type={type}
        className={className}
        id={id}
        name={name}
        {...rest}
      />
    </Form.Item>
  );
};

export default Input;
