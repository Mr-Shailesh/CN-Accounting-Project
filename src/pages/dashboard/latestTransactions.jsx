import { EllipsisOutlined, PrinterOutlined } from "@ant-design/icons";
import { Dropdown, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomCard from "../../components/Card/customCard";
import CustomTable from "../../components/Table";
import {
  expensesData,
  incomeDatas,
} from "../../redux/Dashboard/DashboardSelector";
import Styles from "./dashboard.module.scss";

import { isEmpty } from "lodash";

const LatestTransactions = () => {
  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 190,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "isExpense",
      width: 150,
      render: (e) => {
        if (e) {
          return (
            <>
              <Tag className={Styles.expenditureTag}>Expense</Tag>
            </>
          );
        } else {
          return (
            <>
              <Tag className={Styles.incomeTag}>Income</Tag>
            </>
          );
        }
      },
    },
  ];

  const items = [
    {
      label: (
        <div>
          <PrinterOutlined />
          <Space className="ml-10">Print</Space>
        </div>
      ),
      key: "0",
    },
  ];
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const incomeData = useSelector(incomeDatas);
  const expenseData = useSelector(expensesData);
  useEffect(() => {
    if (!isEmpty(incomeData)) {

      setIncome(Object.values(incomeData));
    }
  }, [incomeData]);
  useEffect(() => {
    if (!isEmpty(expenseData)) {

      setExpense(Object.values(expenseData));
    }
  }, [expenseData]);

  const totalArray = [...income, ...expense];
  totalArray.sort((a, b) => Math.abs(dayjs(a.date)) - Math.abs(dayjs(b.date)));
  const DashboardChild = () => {
    return (
      <>
        <Typography className={Styles.titleTypes}>
          <div className={Styles.expensesTitle}>Latest Transactions</div>
          <div
            className={Styles.expensesMenu}
            onClick={(e) => e.preventDefault()}
          >
            <Dropdown menu={{ items }} trigger={["click"]}>
              <EllipsisOutlined style={{ fontSize: "25px" }} />
            </Dropdown>
          </div>
        </Typography>
        <div className={Styles.commonExpenditureMain}>
          <CustomTable
            sticky={{ x: "calc(700px + 50%)", y: 240 }}
            data={totalArray}
            columns={columns}
            pagination={{
              pageSize: 5,
            }}
            rowClassName={Styles.rowClass}
            className={"mt-30"}
          />
        </div>
      </>
    );
  };
  return (
    <div>
      <CustomCard className={Styles.cardHeight} children={<DashboardChild />} />
    </div>
  );
};

export default LatestTransactions;
