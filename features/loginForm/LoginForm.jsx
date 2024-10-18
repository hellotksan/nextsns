import React, { useRef } from "react";
import styles from "./LoginForm.module.css";

function LoginForm({ onSubmit }) {
  const email = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email.current.value, password.current.value);
  };

  return (
    <form className={styles.loginBox} onSubmit={(e) => handleSubmit(e)}>
      <p className={styles.loginMsg}>ログインはこちら</p>
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
      <button className={styles.loginButton}>ログイン</button>
      {/* <span className="loginForgot">パスワードを忘れた方へ</span> */}
    </form>
  );
}

export default LoginForm;
