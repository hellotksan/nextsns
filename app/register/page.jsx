"use client";

import React, { useContext, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../state/AuthContext";
import UpdateInfo from "./../../components/updateInfo/index";
import SiteInfoComponent from "./../../components/siteInfo/index";
import styles from "./Register.module.css";

export default function Register() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const router = useRouter();
  const { isFetching, error } = useContext(AuthContext);

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // パスワードと確認用のパスワードがあっているか確認
    if (password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity("パスワードが違います");
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        await axios.post(`${PUBLIC_FOLDER}/api/auth/register`, user);
        navigate("/login");
      } catch (error) {
        window.alert("エラーが発生しました。");
        console.log(error);
        window.location.reload();
      }
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Next SNS</h3>
          {/* <span className={styles.loginDesc}>次世代のSNSアプリを、OSSで</span> */}
          {/* <SiteInfoComponent /> */}
          {/* <UpdateInfo /> */}
        </div>
        <div className={styles.loginRight}>
          <form className={styles.loginBox} onSubmit={(e) => handleSubmit(e)}>
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
          <div className={styles.loginRight}>
            <p className={styles.loginAlreadyMsg}>すでにアカウントをお持ちの方はこちら</p>
            <button
              className={styles.loginRegisterButton}
              onClick={handleLoginRedirect}
            >
              ログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
