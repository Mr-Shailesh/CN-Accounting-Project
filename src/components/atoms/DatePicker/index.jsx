import React from "react";
import { DatePicker as BaseDatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const DatePicker = (props) => {
  const { name, className, defaultValue, ...rest } = props;
  const dateFormat = "YYYY/MM/DD";
  return (
    <div className={className}>
      <BaseDatePicker
        name={name}
        defaultValue={dayjs(defaultValue)}
        format={dateFormat}
        {...rest}
      />
    </div>
  );
};

export default DatePicker;
