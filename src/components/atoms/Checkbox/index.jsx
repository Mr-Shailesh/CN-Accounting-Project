import React from "react";
import { Checkbox as BaseCheckbox, Form } from "antd";
import classes from "./styles.module.scss";
const CheckBox = (props) => {
  const { text, name, onChange,checked,...rest} = props;
  const validation = (rule, value, callback) => {
    if(checked) {
        return callback()
    }
    return callback("Please accept the terms and conditions")
};
  return (
    <div className={classes.checkbox}>
      <Form.Item name={name} rules={[
        {
            validator:validation
         
        },
    
    ]}>

      <BaseCheckbox onChange={onChange} name={name} {...rest}>
        {text}
      </BaseCheckbox>
      </Form.Item>
    </div>
  );
};

export default CheckBox;
