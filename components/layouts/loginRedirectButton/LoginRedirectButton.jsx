import React from "react";
import styles from "./LoginRedirectButton.module.css";

function LoginRedirectButton({ onClick }) {
  return (
    <div className={styles.loginRight}>
      <p className={styles.loginAlreadyMsg}>
        すでにアカウントをお持ちの方はこちら
      </p>
      <button className={styles.loginRegisterButton} onClick={onClick}>
        ログイン
      </button>
    </div>
  );
}

export default LoginRedirectButton;
