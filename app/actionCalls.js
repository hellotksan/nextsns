import React from "react";
import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 400) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export const loginCall = async (user, dispatch) => {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  dispatch({ type: "LOGIN_START" });

  try {
    const response = await instance.post(
      `${PUBLIC_FOLDER}/api/auth/login`,
      user
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    if (error.response) {
      if (error.response && error.response.status === 400) {
        alert("パスワードが間違っています");
      } else if (error.response.status === 404) {
        alert("ユーザーが見つかりません");
      } else {
        alert("ログインに失敗しました");
      }
    } else {
      alert("ネットワークエラーが発生しました。再度お試しください。");
    }
    dispatch({ type: "LOGIN_ERROR", payload: error });
  }
};

const ActionCalls = () => {
  return <></>;
};

export default ActionCalls;
