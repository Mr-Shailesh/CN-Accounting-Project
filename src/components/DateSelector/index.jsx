import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/zh-cn";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

dayjs.extend(customParseFormat);

const DateSelector = ({ value, setValue }) => {
  const [dates, setDates] = useState(null);
  const [data, setData] = useState([]);

  const disabledDate = (current) => {
    if (!dates) return false;
    const tooLate = dates[0] && current.diff(dates[0], "days") < 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") < 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  useEffect(() => {
    setData([
      value.length !== 0 && dayjs(new Date(value[0])).format("DD-MM-YYYY"),
      value.length !== 0 && dayjs(new Date(value[1])).format("DD-MM-YYYY"),
    ]);
  }, [value]);

  
  return (
    <RangePicker
      size="large"
      value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => setDates(val)}
      onChange={(val) => setValue(val)}
      onOpenChange={onOpenChange}
      defaultValue={[
        dayjs("2023/01/01", dateFormat),
        dayjs("2023/01/20", dateFormat),
      ]}
      format={dateFormat}
    />
  );
};
export default DateSelector;
