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
    if (error.response && error.response.status === 400) {
      alert("パスワードが間違っています");
    } else if (error.response.status === 404) {
      alert("ユーザーが見つかりません");
    } else {
      // その他のエラーの場合のエラーアラート
      console.error("Login error:", error);
      alert("ログインに失敗しました");
    }
    dispatch({ type: "LOGIN_ERROR", payload: error });
  }
};
