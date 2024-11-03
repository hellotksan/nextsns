"use client";

import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import LoginRedirectButton from "@/components/layouts/loginRedirectButton/LoginRedirectButton";
import RegisterForm from "@/components/layouts/registerForm/RegisterForm";
import Loading from "@/components/layouts/loading/Loading";
import Error from "@/components/layouts/error/Error";
import { AUTH_REGISTER_ENDPOINT } from "@/constants/api";
import { useAppSelector } from "@/hooks/useSelector";

const Register: React.FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleSubmit = async (user: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await axios.post(AUTH_REGISTER_ENDPOINT, user);
      router.push("/login");
    } catch (err) {
      alert("ユーザー登録に失敗しました。もう一度お試しください。");
      router.refresh();
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="w-screen h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
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
              <RegisterForm onSubmit={handleSubmit} />
              <LoginRedirectButton onClick={handleLoginRedirect} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
