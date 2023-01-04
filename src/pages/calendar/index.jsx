import { Card, Tag, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import DateSelector from "../../components/DateSelector";
import styles from "./calendar.module.scss";
import DonutChart from "../../components/Chart/DonutChart";
import CustomTable from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpensesLoading,
  addIncomeLoading,
  expensesData,
  incomeDatas,
} from "../../redux/Dashboard/DashboardSelector";
import {
  getExpensesData,
  getIncomeData,
} from "../../redux/Dashboard/DashboardAction";
import Breadcrumbs from "../../components/atoms/Breadcrumb";
import dayjs from "dayjs";

const columnNames = [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 150,
    sorter: (a, b) => a.date - b.date,
    render: (record) => {
      return dayjs(record).format("DD/MM/YYYY");
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 150,
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 100,
  },
  {
    title: "Status",
    key: "isExpense",
    dataIndex: "isExpense",
    width: 150,
    render: (e) => {
      if (e === true) {
        return (
          <>
            <Tag className={styles.expenditureTag}>Expense</Tag>
          </>
        );
      } else {
        return (
          <>
            <Tag className={styles.incomeTag}>Income</Tag>
          </>
        );
      }
    },
  },
];

const Calendar = () => {
  useEffect(() => {
    dispatch(getExpensesData());
    dispatch(getIncomeData());
  }, []);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [columns, setColumns] = useState(columnNames);
  const [value, setValue] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const expenseData = useSelector(expensesData);
  const incomeData = useSelector(incomeDatas);
  const expenseLoading = useSelector(addExpensesLoading);
  const incomeLoading = useSelector(addIncomeLoading);
  const dispatch = useDispatch();

  const expenseObj = () => {
    const object = [];
    for (var key in expenseData) {
      if (expenseData.hasOwnProperty(key)) {
        object.push({ ...expenseData[key], key: key });
      }
    }
    return object;
  };

  const incomeObj = () => {
    const object = [];
    for (var key in incomeData) {
      if (incomeData.hasOwnProperty(key)) {
        object.push({ ...incomeData[key], key: key });
      }
    }
    return object;
  };

  const initialData = [...expenseObj(), ...incomeObj()];

  const displayData = (startDate, endDate) => {
    const startingDate = new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const endingDate = new Date(endDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const dataWithinDate = [];

    initialData.map((data) => {
      const formatDate = new Date(data.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      if (formatDate >= startingDate && formatDate <= endingDate) {
        dataWithinDate.push({
          ...data,
          date: new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        });
      }
    });

    setSelectedData(dataWithinDate);
  };

  useEffect(() => {
    displayData(value[0], value[1]);
  }, [value]);

  useEffect(() => {
    let newIncome = [];
    let newExpense = [];
    const getData = selectedData.length === 0 ? initialData : selectedData;
    getData.map((d) => {
      if (d.isExpense === true) {
        newExpense.push(d.amount);
      } else {
        newIncome.push(d.amount);
      }
      setExpense(
        newExpense.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0)
      );
      setIncome(
        newIncome.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0)
      );
    });
  }, [selectedData, initialData]);

  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };

  if (expenseLoading || incomeLoading)
    return (
      <div className={styles.loadingFullPage}>
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    );

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Calendar</h1>

        <Breadcrumbs header="Calendar" parentElement="dashboard" />
      </div>
      <div className={styles.layout}>
        <Card>
          <div className={styles.cardHeader}>
            <h3>All transaction</h3>
            <DateSelector value={value} setValue={setValue} />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardBody_left}>
              <CustomTable
                columns={columns}
                data={selectedData.length === 0 ? initialData : selectedData}
                expandable={defaultExpandable}
                pagination={true}
              />
            </div>
            <div className={styles.cardBody_right}>
              <DonutChart
                dountLabel={["Income", "Expense", "Savings"]}
                donutValue={[
                  income,
                  expense,
                  income - expense < 0 ? 0 : income - expense,
                ]}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
