import { Button, Card } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/atoms/Breadcrumb";
import FormModal from "../../components/atoms/FormModal";
import CustomCard from "../../components/Card/customCard";
import ColumnChart from "../../components/Chart/ColumnChart";
import High from "../../components/svg/High";
import Low from "../../components/svg/Low";
import Num from "../../components/svg/Num";
import Total from "../../components/svg/Total";
import { group_by_month } from "../../utils/groupData";
import {
  addExpenseData,
  getExpensesData,
} from "../../redux/Dashboard/DashboardAction";
import { addExpensesSuccess } from "../../redux/Dashboard/DashboardSelector";
import Styles from "./expense.module.scss";
import ExpenseEntry from "./ExpenseEntry";

const Expense = () => {
  const [open, setOpen] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseNo, setExpenseNo] = useState(0);
  const [highestExpense, setHighestExpense] = useState(0);
  const [lowestExpense, setLowestExpense] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  const dispatch = useDispatch();
  const expensesSuccess = useSelector(addExpensesSuccess);

  const handleExpenses = (formData, setFormData) => {
    dispatch(addExpenseData({ ...formData, isExpense: true }));
    setFormData({
      amount: "",
      category: "Category",
      date: "",
      description: "",
    });
  };

  useEffect(() => {
    if (expensesSuccess) {
      setOpen(false);
      dispatch(getExpensesData());
    }
  }, [expensesSuccess]);

  useEffect(() => {
    dispatch(getExpensesData());
  }, []);
  useEffect(() => {
    const data = graphData;

    const grouped_by_month = group_by_month(data).sort((a, b) =>
      a.x.localeCompare(b.x)
    );
    setGroupedData(grouped_by_month);
  }, [graphData]);

  return (
    <div className={Styles.main}>
      <div className={Styles.header}>
        <h1>Expense</h1>
        <Breadcrumbs header="Expense" parentElement="dashboard" />
      </div>
      <div className={Styles.layout}>
        <Card>
          <div className={Styles.cardHeader}>
            <h2>Expense</h2>
            <Button type="primary" onClick={() => setOpen(true)}>
              Add Expense
            </Button>
            <FormModal
              open={open}
              setOpen={setOpen}
              title="Add Expense"
              handleOk={handleExpenses}
            />
          </div>
          <div className={Styles.cardBody}>
            <div className={Styles.cardBody_left}>
              <Card>
                <ColumnChart
                  series={[{ name: "Expense", data: [...groupedData] }]}
                />
              </Card>
            </div>
            <div className={Styles.cardBody_right}>
              <div className={Styles.rightCard}>
                <Card>
                  <div className={Styles.rightCard_inner}>
                    <Total />
                    <h2>₹ {totalExpense}</h2>
                    <p>Total Expense</p>
                  </div>
                </Card>
              </div>
              <div className={Styles.rightCard}>
                <Card>
                  <div className={Styles.rightCard_inner}>
                    <Num />
                    <h2>{expenseNo}</h2>
                    <p>Total Expense Transaction</p>
                  </div>
                </Card>
              </div>
              <div className={Styles.rightCard}>
                <Card>
                  <div className={Styles.rightCard_inner}>
                    <High />
                    <h2>₹ {highestExpense}</h2>
                    <p>Highest Expense</p>
                  </div>
                </Card>
              </div>
              <div className={Styles.rightCard}>
                <Card>
                  <div className={Styles.rightCard_inner}>
                    <Low />
                    <h2>₹ {lowestExpense}</h2>
                    <p>Lowest Expense</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <CustomCard
            children={
              <ExpenseEntry
                setTotalExpense={setTotalExpense}
                setHighestExpense={setHighestExpense}
                setLowestExpense={setLowestExpense}
                setExpenseNo={setExpenseNo}
                setGraphData={setGraphData}
              />
            }
          />
        </Card>
      </div>
    </div>
  );
};

export default Expense;
