import React, { useState } from "react";
import { Modal as BaseModal } from "antd";
import classes from "./styles.module.scss";
const Modal = (props) => {
  const { children, ...rest } = props;
  const [modal2Open, setModal2Open] = useState(true);
  return (
    <BaseModal
      centered
      open={modal2Open}
      onOk={() => setModal2Open(false)}
      onCancel={() => setModal2Open(false)}
      {...rest}
    >
      <div className={classes.content}>{children}</div>
    </BaseModal>
  );
};

export default Modal;
