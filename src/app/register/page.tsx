import React from "react";
import LoginRedirectButton from "@/components/layouts/loginRedirectButton/LoginRedirectButton";
import RegisterForm from "@/components/layouts/registerForm/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-800 flex items-center justify-center">
      <div className="w-[90%] max-w-[1200px] h-auto md:w-[70%] md:h-[70%] flex flex-col md:flex-row rounded-lg p-6">
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-2">
            Next SNS
          </h3>
          <span className="text-base md:text-lg text-gray-100 my-5">
            The SNS Application for the Web with NextJs.
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-center space-y-4 mt-6 md:mt-0">
          <RegisterForm />
          <LoginRedirectButton />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
