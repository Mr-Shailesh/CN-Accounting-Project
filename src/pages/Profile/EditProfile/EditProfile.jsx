import React, { useEffect, useState } from "react";
import styles from "./EditProfile.module.scss";
import { Divider, Form } from "antd";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import {
  addressRule,
  cityRule,
  countryRule,
  emailRule,
  firstNameRule,
  lastNameRule,
  phoneNoRule,
  stateRule,
  zipCodeRule,
} from "../../../components/helpers/validationRules";
import Select from "../../../components/atoms/Select";
import DatePicker from "../../../components/atoms/DatePicker";
import Textarea from "../../../components/atoms/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, resetBlockAuth } from "../../../redux/Auth/AuthAction";
import {
  editLoadingSelector,
  editSuccessSelector,
} from "../../../redux/Auth/AuthSelector";

const EditProfile = ({ setIsEditProfile, userData = {} }) => {
  const {
    url,
    firstName,
    lastName,
    email,
    bio,
    jobTitle,
    phone,
    gender,
    dob,
    address,
    city,
    state,
    country,
    zipCode,
  } = userData;
  const [editProfileData, setEditProfileData] = useState({
    url,
    firstName,
    lastName,
    email,
    bio,
    jobTitle,
    phone,
    gender,
    dob,
    address,
    city,
    state,
    country,
    zipCode,
  });

  const handleChange = ({ target: { name, value } }) => {
    setEditProfileData({
      ...editProfileData,
      [name]: value,
    });
  };

  const loading = useSelector(editLoadingSelector);
  const success = useSelector(editSuccessSelector);
  useEffect(() => {
    if (success) {
      setIsEditProfile(false);
      dispatch(resetBlockAuth({ blockType: "editUser" }));
    }
  }, [success]);

  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(editProfile({ ...editProfileData, userId: userData.userId }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleSelectChange = (value) => {
    setEditProfileData({ ...editProfileData, gender: value });
  };
  const handleDateChange = (date, dateString) => {
    setEditProfileData({ ...editProfileData, dob: dateString });
  };
  const [selectedImage, setSelectedImage] = useState(null);

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
      initialValues={editProfileData}
      autoComplete="off"
      className={styles.editUserDetailWrapper}
    >
      <div className={styles.headingWrapper}>
        <div>Edit Profile Detail</div>
        <div>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </div>
      <Divider />

      <div className={styles.mainDetailWrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>Avatar</div>
          <div className={styles.valueWrapper}>
            <input type="url" name="url"  className={styles.inputBox} onChange={handleChange} />
           
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>Full Name</div>
          <div className={styles.nameWrapper}>
            <Input
              name="firstName"
              rules={firstNameRule}
              type="text"
              placeholder="First Name"
              className={styles.inputBox}
              value={editProfileData.firstName}
              onChange={handleChange}
            />
            <Input
              name="lastName"
              rules={lastNameRule}
              type="text"
              placeholder="Last Name"
              className={styles.inputBox}
              value={editProfileData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>Email</div>
          <div className={styles.valueWrapper}>
            <Input
              name="email"
              rules={emailRule}
              type="email"
              placeholder="Email"
              id="email"
              className={styles.inputBox}
              value={editProfileData.email}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>Bio</div>
          <div className={styles.valueWrapper}>
            <Input
              name="bio"
              type="text"
              placeholder="Bio"
              id="bio"
              className={styles.inputBox}
              value={editProfileData.bio}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>Job Title</div>
          <div className={styles.valueWrapper}>
            <Input
              name="jobTitle"
              type="text"
              placeholder="Job Title"
              id="jobTitle"
              className={styles.inputBox}
              value={editProfileData.jobTitle}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>Phone Number</div>
          <div className={styles.valueWrapper}>
            <Input
              name="phone"
              rules={phoneNoRule}
              type="text"
              placeholder="Phone No"
              className={styles.inputBox}
              value={editProfileData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>Gender</div>
          <div className={styles.valueWrapper}>
            <Select
              name="gender"
              onChange={handleSelectChange}
              options={[
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
              ]}
              className={styles.gender}
              defaultValue="--Gender--"
              value={editProfileData.gender}
            />
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>Date Of Birth</div>
          <div className={styles.valueWrapper}>
            <DatePicker
              name="dob"
              className={styles.datePicker}
              onChange={handleDateChange}
              defaultValue={editProfileData.dob}
            />
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>Address</div>
          <div className={styles.valueWrapper}>
            <Textarea
              name="address"
              rules={addressRule}
              placeholder="Enter Address"
              value={editProfileData.address}
              onChange={handleChange}
            />
            <div className={styles.useGrid}>
              <Input
                name="city"
                rules={cityRule}
                type="text"
                placeholder="City"
                className={styles.inputBox}
                value={editProfileData.city}
                onChange={handleChange}
              />
              <Input
                name="state"
                rules={stateRule}
                type="text"
                placeholder="State"
                className={styles.inputBox}
                value={editProfileData.state}
                onChange={handleChange}
              />
            </div>
            <div className={styles.useGrid}>
              <Input
                name="country"
                rules={countryRule}
                type="text"
                placeholder="Country"
                className={styles.inputBox}
                value={editProfileData.country}
                onChange={handleChange}
              />
              <Input
                name="zipCode"
                rules={zipCodeRule}
                type="text"
                placeholder="Zip Code"
                className={styles.inputBox}
                value={editProfileData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default EditProfile;
