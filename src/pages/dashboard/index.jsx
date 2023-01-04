import { Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CustomCard from "../../components/Card/customCard";
import DashboardHeaderChild from "./dashboardHeaderChild";
import ExpensesTypes from "./expensesTypes";
import LatestTransactions from "./latestTransactions";
import Styles from "./dashboard.module.scss";
import AreaChart from "../../components/Chart/AreaChart";
import {
  getExpensesData,
  getIncomeData,
} from "../../redux/Dashboard/DashboardAction";
import {
  expensesData,
  incomeDatas,
} from "../../redux/Dashboard/DashboardSelector";
import { useDispatch, useSelector } from "react-redux";
import GradientChart from "../../components/Chart/GradientChart";
import Button from "../../components/atoms/Button";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { isEmpty } from "lodash";

const DashboardPage = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const dispatch = useDispatch();
  const incomeData = useSelector(incomeDatas);
  const expenseData = useSelector(expensesData);
  useEffect(() => {
    dispatch(getExpensesData());
    dispatch(getIncomeData());
  }, []);

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

  const [incomeGraphData, setIncomeGraphData] = useState([]);
  const [expenseGraphData, setExpenseGraphData] = useState([]);
  useEffect(() => {
    const data = [];
    if (income?.length !== 0) {
      setTotalIncome(
        income
          ?.map((i) => {
            data.push(i.amount);
            return i?.amount;
          })
          ?.reduce((a, b) => {
            return +a + +b;
          })
      );
      setIncomeGraphData(data);
    }
  }, [income]);
  useEffect(() => {
    const data = [];
    if (expense.length !== 0) {
      setTotalExpense(
        expense
          ?.map((i) => {
            data.push(i.amount);
            return i?.amount;
          })
          ?.reduce((a, b) => +a + +b)
      );

      setExpenseGraphData(data);
    }
  }, [expense]);
  const totalSaving = totalIncome - totalExpense;

  const series = [
    {
      name: "Income",
      data: incomeGraphData.length ? incomeGraphData : [0],
    },
    {
      name: "Expenses",
      data: expenseGraphData.length ? expenseGraphData : [0],
    },
  ];

  return (
    <>
      <div className={Styles.dashboard}>
        <Row>
          <Col xs={24} xl={18}>
            <Row>
              <Col xs={24} md={8}>
                <div className="m-10">
                  <CustomCard
                    children={
                      <DashboardHeaderChild
                        title={"Income"}
                        currency={<span>&#8377;</span>}
                        totalData={totalIncome}
                        icon={<ArrowDownOutlined className={Styles.upArrow} />}
                      />
                    }
                  />
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="m-10">
                  <CustomCard
                    children={
                      <DashboardHeaderChild
                        title={"Expense"}
                        currency={<span>&#8377;</span>}
                        totalData={totalExpense}
                        icon={<ArrowUpOutlined className={Styles.downArrow} />}
                      />
                    }
                  />
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className=" m-10">
                  <CustomCard
                    children={
                      <DashboardHeaderChild
                        title={"Savings"}
                        currency={<span>&#8377;</span>}
                        totalData={totalSaving < 0 ? 0 : totalSaving}
                        icon={<SaveOutlined className={Styles.save} />}
                      />
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <CustomCard
                  className={"m-10"}
                  children={
                    <AreaChart series={series} height={400} width={"100%"} />
                  }
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={6}>
            <CustomCard
              className={"m-10"}
              children={
                <div className={Styles.gradientChart}>
                  <div className={Styles.title}>Monthly Savings</div>
                  <div className={Styles.chartDiv}>
                    <GradientChart
                      totalIncome={totalIncome}
                      totalSaving={totalSaving}
                    />
                  </div>
                  <div className={Styles.subText}>
                    You need a bit more effort to hit monthly savings.
                  </div>
                  <div className={Styles.learnBtn}>
                    <Button type={"primary"}>Learn More</Button>
                  </div>
                </div>
              }
            />
          </Col>
        </Row>
        <div className={Styles.dashboardMiddleSection}>
          <Row>
            <Row>
              <Col xs={24} xl={8}>
                <div className="m-10">
                  <ExpensesTypes
                    incomeData={incomeData}
                    expenseData={expenseData}
                  />
                </div>
              </Col>
              <Col xs={24} xl={16}>
                <div className={Styles.dashboardCardWrapper}>
                  <LatestTransactions />
                </div>
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
