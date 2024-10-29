"use client";

import { AuthContext } from "@/state/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import axios from "axios";
import LoginRedirectButton from "@/components/layouts/loginRedirectButton/LoginRedirectButton";
import RegisterForm from "@/components/layouts/registerButton/RegisterButton";
import Loading from "@/components/layouts/loading/Loading";
import Error from "@/components/layouts/error/Error";

function Register() {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { isFetching, error } = useContext(AuthContext);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleSubmit = async (user) => {
    try {
      await axios.post(`${PUBLIC_FOLDER}/api/auth/register`, user);
      router.push("/login");
    } catch (error) {
      alert("エラーが発生しました。");
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
          <RegisterForm onSubmit={handleSubmit} />
          <LoginRedirectButton onClick={handleLoginRedirect} />
        </div>
      </div>
    </div>
  );
}

export default Register;
