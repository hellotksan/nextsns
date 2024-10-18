"use client";

import React, { useContext, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../state/AuthContext";

// components
import Loading from "../../components/layouts/loading/Loading";
import Error from "../../components/layouts/error/Error";

// features
import RegisterForm from "../../features/registerForm/RegisterForm";
import LoginRedirectButton from "../../features/loginRedirectButton/LoginRedirectButton";
// import UpdateInfo from "./../../components/updateInfo/index";
// import SiteInfoComponent from "./../../components/siteInfo/index";

// module css files
import styles from "./Register.module.css";

function Register() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const router = useRouter();
  const { isFetching, error } = useContext(AuthContext);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleSubmit = async (user) => {
    try {
      await axios.post(`${PUBLIC_FOLDER}/api/auth/register`, user);
      navigate("/login");
    } catch (error) {
      window.alert("エラーが発生しました。");
      console.log(error);
      window.location.reload();
    }
  };

  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
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
          <RegisterForm onSubmit={handleSubmit} />
          <LoginRedirectButton onClick={handleLoginRedirect} />
        </div>
      </div>
    </div>
  );
}

export default Register;
