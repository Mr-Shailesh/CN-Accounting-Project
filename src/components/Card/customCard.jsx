import { Card } from "antd";
import React from "react";

const CustomCard = ({ children, title, className, extra }) => (
  <Card className={className} title={title} extra={extra}>
    {children}
  </Card>
);

export default CustomCard;
