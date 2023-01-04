import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import CustomCard from "../../components/Card/customCard";
import Styles from "./income.module.scss";
import IncomeEntry from "./incomeEntry";
import ColumnChart from "../../components/Chart/ColumnChart";
import FormModal from "../../components/atoms/FormModal";
import Total from "../../components/svg/Total";
import Num from "../../components/svg/Num";
import High from "../../components/svg/High";
import Low from "../../components/svg/Low";
import { group_by_month } from "../../utils/groupData";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncomeData,
  getIncomeData,
} from "../../redux/Dashboard/DashboardAction";
import { addIncomeSuccess } from "../../redux/Dashboard/DashboardSelector";
import Breadcrumbs from "../../components/atoms/Breadcrumb";

const Income = () => {
  const [open, setOpen] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [incomeNo, setIncomeNo] = useState(0);
  const [highestIncome, setHighestIncome] = useState(0);
  const [lowestIncome, setLowestIncome] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  const dispatch = useDispatch();
  const incomeSuccess = useSelector(addIncomeSuccess);

  const handleIncome = (formData, setFormData) => {
    dispatch(addIncomeData({ ...formData, isExpense: false }));
    setFormData({
      amount: "",
      category: "Category",
      date: "",
      description: "",
    });
  };

  useEffect(() => {
    dispatch(getIncomeData());
  }, []);

  useEffect(() => {
    if (incomeSuccess) {
      setOpen(false);
      dispatch(getIncomeData());
    }
  }, [incomeSuccess]);
  
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
        <h1>Income</h1>
        <Breadcrumbs header="Income" parentElement="dashboard" />
      </div>
      <div className={Styles.layout}>
        <Card>
          <div className={Styles.cardHeader}>
            <h2>Income</h2>

            <Button type="primary" onClick={() => setOpen(true)}>
              Add Income
            </Button>
            <FormModal
              open={open}
              setOpen={setOpen}
              title="Add Income"
              handleOk={handleIncome}
            />
          </div>
          <div className={Styles.cardBody}>
            <div className={Styles.cardBody_left}>
              <Card>
                <ColumnChart
                  series={[{ name: "Income", data: [...groupedData] }]}
                />
              </Card>
            </div>
            <div className={Styles.cardBody_right}>
              <div className={Styles.rightCard}>
                <Card>
                  <div className={Styles.rightCard_inner}>
                    <Total />
                    <h2>₹ {totalIncome}</h2>
                    <p>Total Income</p>
                  </div>
                </Card>
              </div>
              <div className={Styles.rightCard}>
                <Card>
                  <div className={Styles.rightCard_inner}>
                    <Num />
                    <h2>{incomeNo}</h2>
                    <p>Total Income Transaction</p>
                  </div>
                </Card>
              </div>
              <div className={Styles.rightCard}>
                <Card>
                  <div className={Styles.rightCard_inner}>
                    <High />
                    <h2>₹ {highestIncome}</h2>
                    <p>Highest Income</p>
                  </div>
                </Card>
              </div>
              <div className={Styles.rightCard}>
                <Card>
                  <div className={Styles.rightCard_inner}>
                    <Low />
                    <h2>₹ {lowestIncome}</h2>
                    <p>Lowest Income</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <CustomCard
            children={
              <IncomeEntry
                setTotalIncome={setTotalIncome}
                setHighestIncome={setHighestIncome}
                setLowestIncome={setLowestIncome}
                setIncomeNo={setIncomeNo}
                setGraphData={setGraphData}
              />
            }
          />
        </Card>
      </div>
    </div>
  );
};

export default Income;
