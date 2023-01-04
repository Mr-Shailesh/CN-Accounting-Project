import { Typography } from "antd";
import React from "react";
import Styles from "./dashboard.module.scss";

const DashboardHeaderChild = ({
  title,
  totalData,
  currency = "$",
  comment = "",
  icon,
}) => {
  return (
    <>
      <div className={Styles.commonExpenditureMain}>
        <div className="pb-10">
          <Typography className={Styles.commonExpenditureTitle}>
            {title}
          </Typography>
        </div>
        <div className={Styles.commonExpenditureBody}>
          <Typography className={Styles.commonExpenditureContent}>
            {currency}
          </Typography>
          <Typography className={Styles.commonExpenditureContent}>
            {totalData
              ? totalData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : 0}
            {icon}
          </Typography>
        </div>
        <div className={""}>
          <Typography className={Styles.commonExpenditureFooter}>
            {comment}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default DashboardHeaderChild;
