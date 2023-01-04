import React from "react";
import { Radio as BaseRadio } from "antd";
const Radio = (props) => {
  const { value, children } = props;
  return <BaseRadio value={value}>{children}</BaseRadio>;
};

export default Radio;
