"use client";

import { AuthContext } from "@/state/AuthContext";
import { useRouter } from "next/navigation";
import { loginCall } from "../actionCalls";
import React, { useContext } from "react";

// components
import Loading from "@/components/layouts/loading/Loading";
import Error from "@/components/layouts/loading/Loading";

// features
import RegisterButton from "../../features/registerButton/RegisterButton";
import LoginForm from "../../features/loginForm/LoginForm";

// module css files
import styles from "./Login.module.css";

function Login() {
  const router = useRouter();
  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const handleLoginSubmit = async (email, password) => {
    try {
      await loginCall({ email, password }, dispatch);
      router.push("/");
    } catch (error) {
      console.log(error);
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
        {/* left side */}
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Next SNS</h3>
          {/* <span className={styles.loginDesc}>次世代のSNSアプリを、OSSで</span> */}
        </div>

        {/* right side */}
        <div className={styles.loginRight}>
          <LoginForm onSubmit={handleLoginSubmit} />
          <RegisterButton onClick={handleRegisterRedirect} />
        </div>
      </div>
    </div>
  );
}

export default Login;
