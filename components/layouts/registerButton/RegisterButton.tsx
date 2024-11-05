"use client";

import React from "react";
import { useRouter } from "next/navigation";

const RegisterButton: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center flex-1">
      <p className="text-white text-center font-semibold text-lg mb-2">
        アカウント作成はこちら
      </p>
      <button
        className="h-12 w-3/5 self-center rounded-lg border-none bg-green-700 text-white text-lg font-medium cursor-pointer hover:bg-green-800 transition-colors"
        onClick={() => router.replace("/register")}
      >
        アカウント作成
      </button>
    </div>
  );
};

export default RegisterButton;
