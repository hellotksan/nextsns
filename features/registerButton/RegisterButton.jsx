import React from "react";
import styles from "./RegisterButton.module.css";

function RegisterButton({ onClick }) {
  return (
    <div className={styles.loginRight}>
      <p className={styles.loginAlreadyMsg}>アカウント作成はこちら</p>
      <button className={styles.loginRegisterButton} onClick={onClick}>
        アカウント作成
      </button>
    </div>
  );
}

export default RegisterButton;
