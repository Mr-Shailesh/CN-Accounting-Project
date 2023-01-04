import { Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../../components/atoms/FormModal";
import Modal from "../../components/atoms/Modal";
import CustomTable from "../../components/Table";
import dayjs from "dayjs";
import {
  deleteIncomeData,
  editIncomeData,
  getIncomeData,
} from "../../redux/Dashboard/DashboardAction";
import {
  addIncomeLoading,
  deleteIncomeLoading,
  incomeDatas,
  incomeDeleteSuccess,
  incomeEditLoading,
  incomeEditSuccess,
} from "../../redux/Dashboard/DashboardSelector";
import classes from "./income.module.scss";
import { isEmpty } from "lodash";

const IncomeEntry = ({
  setTotalIncome,
  setHighestIncome,
  setLowestIncome,
  setIncomeNo,
  setGraphData,
}) => {
  const [incomeData, setIncomeData] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState({});
  const [open, setOpen] = useState(false);
  const incomeDetails = useSelector(incomeDatas);
  const [confirm, setConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [uniqueKey, setUniqueKey] = useState();
  const dispatch = useDispatch();
  const deleteSuccess = useSelector(incomeDeleteSuccess);
  const deleteLoading = useSelector(deleteIncomeLoading);
  const addLoading = useSelector(addIncomeLoading);
  const editSuccess = useSelector(incomeEditSuccess);
  const editLoading = useSelector(incomeEditLoading);

  const deleteData = (id) => {
    setConfirm(true);
    setDeleteId(id);
  };

  const handleDelete = () => {
    dispatch(deleteIncomeData(deleteId));
    setConfirm(false)
  }

  const editData = (data) => {
    setSelectedIncome(data);
    setUniqueKey(data.uniqueKey);
    setOpen(true);
  };

  const editIncomeHandle = (formData) => {
    dispatch(editIncomeData({ ...formData, uniqueKey }));
    setOpen(false);
    dispatch(getIncomeData());
  };

  const incomeColumns = [
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
    const newIncome = [];
    const calcTotal = [];
    incomeData.map((d) => {
      newIncome.push({
        x: dayjs(d.date).format("YYYY/MM/DD"),
        y: d.amount,
      });
      calcTotal.push(d.amount);
      setGraphData(newIncome);
      setTotalIncome(
        parseFloat(
          calcTotal.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
          }, 0)
        )
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      setIncomeNo(calcTotal.length);
      setHighestIncome(
        parseFloat(Math.max(...calcTotal))
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      setLowestIncome(
        parseFloat(Math.min(...calcTotal))
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    });
  }, [incomeData]);

  const formatObject = () => {
    const object = [];
    if (!isEmpty(incomeDetails)) {
      for (var key in incomeDetails) {
        if (incomeDetails.hasOwnProperty(key)) {
          object.push({ ...incomeDetails[key], uniqueKey: key });
        }
      }
    }
    return object;
  }

  useEffect(() => {
    setIncomeData(formatObject());
  }, [incomeDetails]);
  
  useEffect(() => {
    if (deleteSuccess) {
      dispatch(getIncomeData())
    }
  }, [deleteSuccess])
  
  useEffect(() => {
    if (editSuccess) {
      dispatch(getIncomeData());
    }
  }, [editSuccess]);

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
          data={incomeData}
          columns={incomeColumns}
          deleteAction={deleteData}
          editAction={editData}
          loading={incomeData.length < 0}
        />
        <FormModal
          hide
          open={open}
          setOpen={setOpen}
          data={selectedIncome}
          handleOk={editIncomeHandle}
        />
      </div>
    </>
  );
};

export default IncomeEntry;
