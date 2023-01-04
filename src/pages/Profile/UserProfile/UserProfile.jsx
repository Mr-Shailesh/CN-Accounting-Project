import React from "react";
import styles from "./UserProfile.module.scss";
import { Divider } from "antd";
import Button from "../../../components/atoms/Button";
import UserProfileDetail from "./UserProfileDetail";
import userProfileDetailData from "./UserProfileDetailData";

const UserProfile = ({ setIsEditProfile, userData = {} }) => {
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

  const userDetails = [
    {
      title: "Full Name",
      value: firstName + " " + lastName,
    },
    {
      title: "Email",
      value: email,
    },
    {
      title: "Bio",
      value: bio || "-",
    },
    {
      title: "Job Title",
      value: jobTitle || "-",
    },
    {
      title: "Phone Number",
      value: phone,
    },
    {
      title: "Gender",
      value: gender,
    },
    {
      title: "Date Of Birth",
      value: new Date(dob).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    },
    {
      title: "Address",
      value: address,
    },
    {
      title: "City",
      value: city,
    },
    {
      title: "State",
      value: state,
    },
    {
      title: "Country",
      value: country,
    },
    {
      title: "Zip Code",
      value: zipCode,
    },
  ];
  const handleEditProfile = () => {
    setIsEditProfile(true);
  };
  return (
    <div className={styles.userDetailWrapper}>
      <div className={styles.headingWrapper}>
        <div>Profile Detail</div>
        <div>
          <Button type="primary" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </div>
      </div>
      <Divider />

      <div className={styles.mainDetailWrapper}>
        {userDetails?.map((element, index) => {
          return (
            <UserProfileDetail
              key={index}
              title={element.title}
              value={element.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
