import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile/UserProfile";
import EditProfile from "./EditProfile/EditProfile";
import styles from "./Profile.module.scss";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Progress } from "antd";
import Breadcrumbs from "../../components/atoms/Breadcrumb";
import {
  expensesData,
  incomeDatas,
} from "../../redux/Dashboard/DashboardSelector";
import {
  getExpensesData,
  getIncomeData,
} from "../../redux/Dashboard/DashboardAction";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
const Profile = () => {
  const dispatch = useDispatch();

  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const incomeData = useSelector(incomeDatas);
  const expenseData = useSelector(expensesData);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
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
  useEffect(() => {
    if (income?.length !== 0) {
      setTotalIncome(
        income
          ?.map((i) => i?.amount)
          ?.reduce((a, b) => {
            return +a + +b;
          })
      );
    }
  }, [income]);
  useEffect(() => {
    if (expense.length !== 0) {
      setTotalExpense(
        expense?.map((i) => i?.amount)?.reduce((a, b) => +a + +b)
      );
    }
  }, [expense]);
  const totalSaving = totalIncome - totalExpense;

  const [isEditProfile, setIsEditProfile] = useState(false);
  const userData = useSelector((state) => state.auth.user.data);
  const checkData = Object.keys(userData).filter((k) => {
    if (
      userData[k] === "" ||
      userData[k] === undefined ||
      userData[k] === null
    ) {
      return k;
    }
  });
  const percentage = (10 - (checkData.length * 10) / 10) * 10;
  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerWrapper}>
          <h1>Profile</h1>
          <Breadcrumbs header="Profile" parentElement="dashboard" />
        </div>
        <div className={styles.avatarWrapper}>
          <div className={styles.imageWrapper}>
            {userData.url ? (
              <img src={userData.url} alt="Img note find" />
            ) : (
              <Avatar shape="square" size={110} icon={<UserOutlined />} />
            )}
          </div>

          <div className={styles.avatarDetailWrapper}>
            <div className={styles.nameWrapper}>
              {userData.firstName} {userData.lastName}
            </div>
            <div className={styles.tradingWrapper}>
              <div className={styles.incomeWrapper}>
                <div className={styles.amountWrapper}>
                  <div className={styles.arrowWrapper}>
                    <ArrowDownOutlined />
                  </div>
                  <div className={styles.detailWrapper}>{totalIncome}</div>
                </div>
                <div className={styles.textWrapper}>
                  <span>Income</span>
                </div>
              </div>
              <div className={styles.incomeWrapper}>
                <div className={styles.amountWrapper}>
                  <div className={styles.arrowWrapper}>
                    <ArrowUpOutlined />
                  </div>
                  <div className={styles.detailWrapper}>{totalExpense}</div>
                </div>
                <div className={styles.textWrapper}>
                  <span>Expense</span>
                </div>
              </div>
              <div className={styles.incomeWrapper}>
                <div className={styles.amountWrapper}>
                  <div className={styles.arrowWrapper}>
                    <SaveOutlined />
                  </div>
                  <div className={styles.detailWrapper}>{totalSaving}</div>
                </div>
                <div className={styles.textWrapper}>
                  <span>Savings</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rangeWrapper}>
            <Progress type="circle" percent={percentage} />
          </div>
        </div>
      </div>

      {isEditProfile ? (
        <EditProfile
          isEditProfile={isEditProfile}
          setIsEditProfile={setIsEditProfile}
          userData={userData}
        />
      ) : (
        <UserProfile
          isEditProfile={isEditProfile}
          setIsEditProfile={setIsEditProfile}
          userData={userData}
        />
      )}
    </div>
  );
};

export default Profile;
