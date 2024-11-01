"use client";

import {
  loginStart,
  loginSuccess,
  loginError,
} from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { loginCall } from "../actionCalls";
import RegisterButton from "@/components/layouts/registerButton/RegisterButton";
import LoginForm from "@/components/layouts/loginForm/LoginForm";
import Loading from "@/components/layouts/loading/Loading";
import Error from "@/components/layouts/error/Error";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useAppSelector } from "@/hooks/useSelector";
import { User } from "@/types/user";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const handleLoginSubmit = async (
    email: string,
    password: string
  ): Promise<void> => {
    dispatch(loginStart());

    try {
      const userData: User = await loginCall({ email, password, dispatch });
      dispatch(loginSuccess(userData));
      router.push("/");
    } catch (err) {
      dispatch(loginError("ログインに失敗しました"));
      alert("エラーが発生しました。");
      router.refresh();
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="w-[70%] h-[70%] flex rounded-lg p-6">
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-5xl font-extrabold text-gray-800 mb-2">
              Next SNS
            </h3>
            <span className="text-lg text-gray-800">
              次世代のSNSアプリを、OSSで
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-4">
            <LoginForm onSubmit={handleLoginSubmit} />
            <RegisterButton onClick={handleRegisterRedirect} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
