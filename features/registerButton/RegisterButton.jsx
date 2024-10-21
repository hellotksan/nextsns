import styles from "./RegisterButton.module.css";
import React from "react";

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
