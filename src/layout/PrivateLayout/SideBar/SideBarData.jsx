import {
  ContactsFilled,
  DollarCircleFilled,
  FundFilled,
  PieChartOutlined,
} from "@ant-design/icons";
import React from "react";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

export const menuData = [
  {
    key: "1",
    label: "Dashboard",
    route: "/dashboard",
    icon: <PieChartOutlined />,
  },
  {
    key: "2",
    label: "Income",
    route: "/income",
    icon: <DollarCircleFilled />,
  },
  {
    key: "3",
    label: "Expense",
    route: "/expense",
    icon: <FundFilled />,
  },
  {
    key: "4",
    label: "Calendar",
    route: "/calendar",
    icon: <FundFilled />,
  },
  {
    key: "5",
    label: "Profile",
    route: "/profile",
    icon: <UserOutlined />,
  },
  {
    key: "6",
    label: "Contact Us",
    route: "/contact-us",
    icon: <ContactsFilled />,
  },
];
