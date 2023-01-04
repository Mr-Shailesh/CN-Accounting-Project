import React from "react";
import { Select as BaseSelect } from "antd";

const Select = (props) => {
  const {
    options,
    value,
    name,
    className,
    defaultValue,
    rules,
    onChange,
    ...rest
  } = props;
  return (
    <div className={className}>
      <BaseSelect
        value={value}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        {...rest}
      />
    </div>
  );
};

export default Select;
