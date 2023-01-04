import React from "react";
import { Breadcrumb } from "antd";
import styles from "./Breadcrumb.module.scss";
const Breadcrumbs = (props) => {
  const { header, parentElement } = props;
  return (
    <Breadcrumb className={styles.breadcrumbWrapper}>
      <Breadcrumb.Item>
        <a href={`/${parentElement}`} className={styles.breadcrumbFirst}>
          {parentElement}
        </a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{header}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
export default Breadcrumbs;
