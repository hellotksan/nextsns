import React, { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../actionCalls";
import { AuthContext } from "../../state/AuthContext";
import { useRouter } from "next/router";

export default function Login() {
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
    <div className="login">
      <div className="loginWrapper">
        {/*-- 左側のロゴとタイトル --*/}
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で。</span>
        </div>
        {/*-- 右側のログインフォーム --*/}
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMsg">ログインはこちら</p>
            <input
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="パスワード"
              required
              minLength="6"
              ref={password}
            />
            <button className="loginButton">ログイン</button>
            {/* <span className="loginForgot">パスワードを忘れた方へ</span> */}
          </form>
          <button
            className="loginRegisterButton"
            onClick={handleRegisterRedirect}
          >
            アカウント作成
          </button>
        </div>
      </div>
    </div>
  );
}
