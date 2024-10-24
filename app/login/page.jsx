"use client";

import { AuthContext } from "@/state/AuthContext";
import { useRouter } from "next/navigation";
import { loginCall } from "../actionCalls";
import React, { useContext } from "react";
import Loading from "@/components/layouts/loading/Loading";
import Error from "@/components/layouts/loading/Loading";
import RegisterButton from "@/features/registerButton/RegisterButton";
import LoginForm from "@/features/loginForm/LoginForm";

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
          <LoginForm onSubmit={handleLoginSubmit} />
          <RegisterButton onClick={handleRegisterRedirect} />
        </div>
      </div>
    </div>
  );
}

export default Login;
