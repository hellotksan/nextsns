"use client";

import React, { useContext, useRef } from "react";
import { loginCall } from "../actionCalls";
import { AuthContext } from "../../state/AuthContext";
import { useRouter } from "next/navigation";
import UpdateInfo from "./../../components/updateInfo/index";
import SiteInfoComponent from "./../../components/siteInfo/index";
import styles from "./Login.module.css";

function Login() {
  const email = useRef();
  const password = useRef();
  const router = useRouter();
  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginCall(
        {
          email: email.current.value,
          password: password.current.value,
        },
        dispatch
      );
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurred</div>;
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        {/*-- 左側のロゴとタイトル --*/}
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Next SNS</h3>
          {/* <span className={styles.loginDesc}>次世代のSNSアプリを、OSSで</span> */}
          {/* <SiteInfoComponent /> */}
          {/* <UpdateInfo /> */}
        </div>
        {/*-- 右側のログインフォーム --*/}
        <div className={styles.loginRight}>
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
          <div className={styles.loginRight}>
            <p className={styles.loginAlreadyMsg}>アカウント作成はこちら</p>
            <button
              className={styles.loginRegisterButton}
              onClick={handleRegisterRedirect}
            >
              アカウント作成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
