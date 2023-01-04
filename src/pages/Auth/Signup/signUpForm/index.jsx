import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
import classes from "./styles.module.scss";
import Input from "../../../../components/atoms/Input";
import Select from "../../../../components/atoms/Select";
import DatePicker from "../../../../components/atoms/DatePicker";
import Password from "../../../../components/atoms/Password";
import CheckBox from "../../../../components/atoms/Checkbox";
import Button from "../../../../components/atoms/Button";
import {
  addressRule,
  cityRule,
  conPasswordRule,
  countryRule,
  emailRule,
  firstNameRule,
  lastNameRule,
  passwordRule,
  phoneNoRule,
  stateRule,
  zipCodeRule
} from "../../../../components/helpers/validationRules";
import Textarea from "../../../../components/atoms/TextArea";
import { NavLink } from "react-router-dom";
import { signup } from "../../../../redux/Auth/AuthAction";
import { signupLoadingSelector } from "../../../../redux/Auth/AuthSelector";

const SignUpForm = () => {
  const loading = useSelector(signupLoadingSelector);
  const [signUpFormData, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    password: "",
    conPassword: "",
    term: "",
  });
  const dispatch = useDispatch();
  const handleChange = ({ target: { name, value } }) => {
    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    });
  };
  const onFinish = () => {
    dispatch(signup({ ...signUpFormData, url: "", bio: "", jobTitle: "" }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={classes.form}
    >
      <div className={classes.useGrid}>
        <Input
          name="firstName"
          rules={firstNameRule}
          type="text"
          placeholder="First Name"
          className={classes.inputBox}
          value={signUpFormData.firstName}
          onChange={handleChange}
        />
        <Input
          name="lastName"
          rules={lastNameRule}
          type="text"
          placeholder="Last Name"
          className={classes.inputBox}
          value={signUpFormData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className={classes.useGrid}>
        <Input
          name="email"
          rules={emailRule}
          type="email"
          placeholder="Email"
          className={classes.inputBox}
          value={signUpFormData.email}
          onChange={handleChange}
        />
        <Input
          name="phone"
          rules={phoneNoRule}
          type="text"
          placeholder="Phone No"
          className={classes.inputBox}
          value={signUpFormData.phone}
          onChange={handleChange}
        />
      </div>
      <div className={classes.useGrid}>
        <Select
          name="gender"
          placeholder="--Gender--"
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
          ]}
          className={classes.gender}
          value={signUpFormData.gender||null}
          onChange={(val) =>
            setSignUpFormData({ ...signUpFormData, gender: val })
          }
        />
        <DatePicker
          name="dob"
          value={signUpFormData.dob}
          className={classes.datePicker}
          onChange={(date) =>
            setSignUpFormData({ ...signUpFormData, dob: date })
          }
        />
      </div>
      <Textarea
        name="address"
        rules={addressRule}
        placeholder="Enter Address"
        value={signUpFormData.address}
        onChange={handleChange}
      />
      <div className={classes.useGrid}>
        <Input
          name="city"
          rules={cityRule}
          type="text"
          placeholder="City"
          className={classes.inputBox}
          value={signUpFormData.city}
          onChange={handleChange}
        />
        <Input
          name="state"
          rules={stateRule}
          type="text"
          placeholder="State"
          className={classes.inputBox}
          value={signUpFormData.state}
          onChange={handleChange}
        />
      </div>
      <div className={classes.useGrid}>
        <Input
          name="country"
          rules={countryRule}
          type="text"
          placeholder="Country"
          className={classes.inputBox}
          value={signUpFormData.country}
          onChange={handleChange}
        />
        <Input
          name="zipCode"
          rules={zipCodeRule}
          type="text"
          placeholder="Zip Code"
          className={classes.inputBox}
          value={signUpFormData.zipCode}
          onChange={handleChange}
        />
      </div>
      <div className={classes.passwordField}>
        <Password
          name="password"
          rules={passwordRule}
          type="password"
          placeholder="Password"
          className={classes.inputBox}
          value={signUpFormData.password}
          onChange={handleChange}
        />
      </div>
      <Input
        name="conPassword"
        type="password"
        placeholder="Repeat Password"
        className={classes.inputBox}
        rules={conPasswordRule}
        value={signUpFormData.conPassword}
        onChange={handleChange}
      />
      <div className={classes.checkboxField}>
        <CheckBox
          name="term"
          text={`I Accept the Terms`}
          checked={signUpFormData.term}
          onChange={(e) =>
            setSignUpFormData({ ...signUpFormData, term: e.target.checked })
          }
        />
      </div>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button className={classes.button} htmlType="submit" loading={loading}>
          Sign Up
        </Button>
        <div>
          <p className={classes.member}>
            Already have an Account?&nbsp;
            <NavLink to="/login" className={classes.login}>
              Sign In
            </NavLink>
          </p>
        </div>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
