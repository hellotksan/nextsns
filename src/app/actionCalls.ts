import axios from "axios";
import { AUTH_ENDPOINT } from "@/constants/api";

interface LoginProps {
  email: string;
  password: string;
  dispatch: React.Dispatch<{ type: string; payload?: any }>;
}

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

export const loginCall = async (props: LoginProps): Promise<any> => {
  const email = props.email;
  const password = props.password;
  const dispatch = props.dispatch;
  dispatch({ type: "LOGIN_START" });

  try {
    const response = await instance.post(AUTH_ENDPOINT, { email, password });
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    return response.data;
  } catch (error: any) {
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
