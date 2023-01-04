import { Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../../components/atoms/FormModal";
import Modal from "../../components/atoms/Modal";
import CustomTable from "../../components/Table";
import dayjs from "dayjs";
import {
  deleteExpenseData,
  editExpenseData,
  getExpensesData,
} from "../../redux/Dashboard/DashboardAction";
import {
  addExpensesLoading,
  deleteExpensesLoading,
  expenseEditSuccess,
  expensesData,
  expensesDeleteSuccess,
  expensesEditLoading,
} from "../../redux/Dashboard/DashboardSelector";
import classes from "./expense.module.scss";
import { isEmpty } from "lodash";

const ExpenseEntry = ({
  setTotalExpense,
  setHighestExpense,
  setLowestExpense,
  setExpenseNo,
  setGraphData,
}) => {
  const [expenseData, setExpenseData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const expensesDatas = useSelector(expensesData);
  const deleteSuccess = useSelector(expensesDeleteSuccess);
  const deleteLoading = useSelector(deleteExpensesLoading);
  const addLoading = useSelector(addExpensesLoading);
  const editSuccess = useSelector(expenseEditSuccess);
  const dispatch = useDispatch();
  const [uniqueKey, setUniqueKey] = useState();
  const editLoading = useSelector(expensesEditLoading);

  const deleteData = (id) => {
    setConfirm(true);
    setDeleteId(id);
  };

  const handleDelete = () => {
    dispatch(deleteExpenseData(deleteId));
    setConfirm(false);
  };

  const editData = (data) => {
    setUniqueKey(data.uniqueKey);
    setSelectedExpense(data);
    setOpen(true);
  };

  const editExpenseHandle = (formData) => {
    dispatch(editExpenseData({ ...formData, uniqueKey }));
    setOpen(false);
    dispatch(getExpensesData());
  };

  useEffect(() => {
    setExpenseData(formatObject());
  }, [expensesDatas]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(getExpensesData());
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (editSuccess) {
      dispatch(getExpensesData());
    }
  }, [editSuccess]);

  const expenseColumns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (e) => {
        if (!e) return "-";
        return e;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (record) => {
        return dayjs(record).format("DD/MM/YYYY");
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150,
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
    },
  ];

  useEffect(() => {
    const newExpense = [];
    const calcTotal = [];
    expenseData.map((d) => {
      newExpense.push({
        x: dayjs(d.date).format("YYYY/MM/DD"),
        y: d.amount,
      });
      calcTotal.push(d.amount);
      setGraphData(newExpense);
      setTotalExpense(
        parseFloat(
          calcTotal.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
          }, 0)
        )
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      setExpenseNo(calcTotal.length);
      setHighestExpense(
        parseFloat(Math.max(...calcTotal))
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      setLowestExpense(
        parseFloat(Math.min(...calcTotal))
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    });
  }, [expenseData]);

  const formatObject = () => {
    const object = [];
    if (!isEmpty(expensesDatas)) {
      for (var key in expensesDatas) {
        if (expensesDatas.hasOwnProperty(key)) {
          object.push({ ...expensesDatas[key], uniqueKey: key });
        }
      }
    }

    return object;
  };

  if (deleteLoading || addLoading || editLoading)
    return (
      <div className={classes.loadingFullPage}>
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    );

  return (
    <>
      <div>
        {confirm && (
          <Modal
            centered
            title="Confirm"
            open={confirm}
            onOk={() => handleDelete()}
            onCancel={() => setConfirm(false)}
          >
            <h2>Are you sure you want delete this record?</h2>
          </Modal>
        )}
        <CustomTable
          data={expenseData}
          columns={expenseColumns}
          deleteAction={deleteData}
          editAction={editData}
          loading={expenseData < 0}
        />
        <FormModal
          hide
          open={open}
          setOpen={setOpen}
          data={selectedExpense}
          handleOk={editExpenseHandle}
        />
      </div>
    </>
  );
};

export default ExpenseEntry;
