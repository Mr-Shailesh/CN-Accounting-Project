import React, { useEffect, useState } from "react";
import Input from "../../components/atoms/Input";
import styles from "./ContactUs.module.scss";
import {
  contactUsFullNameRule,
  emailRule,
  contactUsMessageRule,
} from "../../components/helpers/validationRules";
import TextArea from "antd/es/input/TextArea";
import contactUs from "../../assets/images/contact us.svg";
import  Button  from "../../components/atoms/Button";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { contactUsApi, resetBlockAuth } from "../../redux/Auth/AuthAction";
import Textarea from "../../components/atoms/TextArea";
import { contactLoadingSelector, contactSuccessSelector } from "../../redux/Auth/AuthSelector";

const ContactUs = () => {
  const [contactUsFormData, setContactUsFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const contactSuccess = useSelector(contactSuccessSelector);
  const contactSLoading = useSelector(contactLoadingSelector);

  const handleChange = ({ target: { name, value } }) => {
    setContactUsFormData({
      ...contactUsFormData,
      [name]: value,
    });
  };

  const submitHandler = () => {
    dispatch(contactUsApi(contactUsFormData))
  };

  useEffect(()=>{
    if (contactSuccess) {
      form.resetFields();
      dispatch(resetBlockAuth({ blockType: 'contactUs' }))
    }
  },[contactSuccess])

  return (
    <>
      <div className={styles.contactUsWrapper}>
        <div className={styles.backgroundWrapper}></div>
        <div className={styles.modalWrapper}>
          <Form className={styles.formWrapper} onFinish={submitHandler} form={form}>
            <Input
              name="name"
              rules={contactUsFullNameRule}
              type="text"
              placeholder="Name"
              className={styles.inputBox}
              value={contactUsFormData.name}
              onChange={handleChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className={styles.inputBox}
              rules={emailRule}
              value={contactUsFormData.email}
              onChange={handleChange}
            />
            <Textarea
              name="message"
              rules={contactUsMessageRule}
              placeholder="Message"
              value={contactUsFormData.message}
              onChange={handleChange}
              className={styles.messageBox}

            />
            <Button className={styles.btnSubmit} htmlType="submit" loading={contactSLoading}>
              Submit
            </Button>
          </Form>
          <div className={styles.detailWrapper}>
            <div className={styles.contactUsSvgWrapper}>
              <img src={contactUs} className={styles.contactUsImage} />
            </div>
            <div className={styles.contactUsDetail}>
              <div className={styles.contactDetailWrapper}>
                <PhoneOutlined className={styles.contactIcon}/>
                <span> +91 98562 53152</span>
              </div>
              <div className={styles.mailDetailWrapper}>
                <MailOutlined className={styles.contactIcon}/>
                <span> Test@test.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
