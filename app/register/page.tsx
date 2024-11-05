import React from "react";
import LoginRedirectButton from "@/components/layouts/loginRedirectButton/LoginRedirectButton";
import RegisterForm from "@/components/layouts/registerForm/RegisterForm";

const RegisterPage: React.FC = () => {
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
          <RegisterForm />
          <LoginRedirectButton />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
