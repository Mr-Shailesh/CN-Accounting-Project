import React from "react";
import styles from "./Footer.module.scss";

const FooterLayout = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.lineWrapper}>
        <hr />
      </div>
      <div className={styles.footerDetailWrapper}>
        <div>
          Copyright © 2022 <b>Ciphernutz</b> All rights reserved.
        </div>
        <div>Term & Conditions | Privacy & Policy</div>
      </div>
    </div>
  );
};

export default FooterLayout;
