import React, { useEffect, useState } from "react";
import { Form, InputNumber } from "antd";
import Modal from "../Modal";
import DatePicker from "../DatePicker";
import Select from "../Select";
import { incomeCategories, expenseCategories } from "../../helpers/categories";
import classes from "./styles.module.scss";
import Input from "../Input";
import { descriptionRule, dateRule } from "../../helpers/validationRules";

const FormModal = ({ title, open, setOpen, data, handleOk }) => {
  const [form] = Form.useForm();
  const [selectedOptions, setSelectedOptions] = useState(incomeCategories);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    amount: "",
    category: "Category",
    date: "",
    description: "",
  });

  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    if (title === "Add Income") {
      setSelectedOptions(incomeCategories);
    } else {
      setSelectedOptions(expenseCategories);
    }
  }, [title]);

  useEffect(() => {
    if (data) {
      setFormData({
        amount: data.amount,
        category: data.category,
        description: data.description,
        date: data.date,
      });
    }
  }, [data, open]);

  return (
    <>
      <Modal
        title={title}
        centered
        open={open}
        okText="Add"
        okButtonProps={{ disabled: buttonDisabled }}
        onOk={() => {
          handleOk(formData, setFormData);
          form.resetFields();
        }}
        onCancel={() => setOpen(false)}
      >
        <Form
          layout="vertical"
          className={classes.form}
          form={form}
          onFieldsChange={() =>
            setButtonDisabled(
              form.getFieldsError().some((field) => field.errors.length > 0)
            )
          }
        >
          <div>
            <Form.Item>
              <Input
                name="description"
                type="text"
                rules={descriptionRule}
                placeholder="description"
                className={classes.inputBox}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item name="date" rules={dateRule}>
              <DatePicker
                name="date"
                value={formData.date}
                className={classes.datePicker}
                format="DD/MM/YYYY"
                onChange={(dateString) => {
                  setFormData({ ...formData, date: dateString });
                }}
              />
            </Form.Item>
            <Form.Item>
              <InputNumber
                type="number"
                required
                name="amount"
                value={formData.amount}
                className={classes.inputNumber}
                onChange={(value) =>
                  setFormData({ ...formData, amount: value })
                }
                addonAfter="₹"
              />
            </Form.Item>
            <Form.Item>
              <Select
                value={formData.category}
                name="category"
                onChange={(value) => {
                  setFormData({ ...formData, category: value });
                }}
                options={selectedOptions}
                className={classes.category}
                placeholder="--Category--"
                defaultValue={formData.category}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default FormModal;
