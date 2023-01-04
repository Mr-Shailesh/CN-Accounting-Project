import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CustomCard from "../../components/Card/customCard";
import Styles from "./dashboard.module.scss";
import { isEmpty } from "lodash";

const ExpensesTypes = ({ incomeData, expenseData }) => {
  const [typeSelector, setTypeSelector] = useState("expenses");
  const [typeData, setTypeData] = useState([]);
  useEffect(() => {
    if (typeSelector === "income") {
      if (!isEmpty(expenseData)) {
        setTypeData(Object.values(expenseData));
      }
    } else {
      if (!isEmpty(incomeData)) {
        setTypeData(Object.values(incomeData));
      }
    }
  }, [incomeData, expenseData, typeSelector]);
  const items = [
    {
      label: (
        <div
          onClick={() => {
            if (typeSelector === "income") {
              setTypeSelector("expenses");
            } else {
              setTypeSelector("income");
            }
          }}
        >
          <Space className="m-10">
            {typeSelector === "income" ? " Income" : " Expenses "}
          </Space>
        </div>
      ),
      key: "0",
    },
  ];
  const Expenses = () => {
    const typesOfData = Array?.from(
      typeData.reduce(
        (m, { category, amount }) =>
          m.set(category, m.get(category) || 0 + +amount),
        new Map()
      ),
      ([category, amount]) => ({ category, amount })
    );
    return (
      <>
        <Typography className={Styles.titleTypes}>
          <div className={Styles.expensesTitle}>
            {typeSelector === "expenses" ? "Incomes Types" : "Expenses Types"}
          </div>
          <div
            className={Styles.expensesMenu}
            onClick={(e) => e.preventDefault()}
          >
            <Dropdown menu={{ items }} trigger={["click"]}>
              <EllipsisOutlined style={{ fontSize: "25px" }} />
            </Dropdown>
          </div>
        </Typography>
        <div>
          {typesOfData.map((data, i) => {
            return (
              <div key={i} className={Styles.listTypes}>
                <Typography className={Styles.typesDetail}>
                  {data.category}
                </Typography>
                <Typography className={Styles.amount}>{data.amount}</Typography>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div>
      <CustomCard children={<Expenses />} />
    </div>
  );
};

export default ExpensesTypes;
