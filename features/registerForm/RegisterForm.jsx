import React, { useRef } from "react";
import styles from "./RegisterForm.module.css";

function RegisterForm({ onSubmit }) {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // パスワードと確認用のパスワードがあっているか確認
    if (password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity("パスワードが違います");
    } else {
      onSubmit({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
    }
  };

  return (
    <form className={styles.loginBox} onSubmit={handleSubmit}>
      <p className={styles.loginMsg}>新規登録はこちら</p>
      <input
        type="text"
        className={styles.loginInput}
        placeholder="ユーザ名"
        required
        ref={username}
      />
      <input
        type="email"
        className={styles.loginInput}
        placeholder="Eメール"
        required
        ref={email}
      />
      <input
        type="password"
        className={styles.loginInput}
        placeholder="パスワード"
        required
        minLength="6"
        ref={password}
      />
      <input
        type="password"
        className={styles.loginInput}
        placeholder="確認用パスワード"
        required
        minLength="6"
        ref={passwordConfirmation}
      />
      <button className={styles.loginButton} type="submit">
        サインアップ
      </button>
    </form>
  );
}

export default RegisterForm;
