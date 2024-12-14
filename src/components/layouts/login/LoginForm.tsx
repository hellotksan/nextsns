"use client";

import React, { useEffect, useRef } from "react";
import { loginCall } from "@/app/actionCalls";
import { useAppDispatch } from "@/hooks/useDispatch";
import { User } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";

const LoginForm: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { login } = useAuth();

  useEffect(() => {
    // 自動でメールフィールドにフォーカスを当てる
    emailRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValue = emailRef.current?.value || "";
    const passwordValue = passwordRef.current?.value || "";
    onSubmit(emailValue, passwordValue);
  };

  const onSubmit = async (email: string, password: string): Promise<void> => {
    try {
      const userData: User = await loginCall({ email, password, dispatch });
      login(userData);
    } catch (err) {
      alert("エラーが発生しました。");
    }
  };

  return (
    <form
      className="w-full max-w-md mx-auto p-8 bg-gray-100 shadow-lg rounded-lg flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <p className="text-center font-semibold text-xl text-gray-800">
        ログインはこちら
      </p>
      <input
        type="email"
        className="h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Eメール"
        required
        ref={emailRef}
        aria-label="Email"
        aria-required="true"
      />
      <input
        type="password"
        className="h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="パスワード"
        required
        minLength={6}
        ref={passwordRef}
        aria-label="Password"
        aria-required="true"
      />
      <button className="h-12 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
        ログイン
      </button>
      <span className="text-center text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors">
        パスワードを忘れた方へ
      </span>
    </form>
  );
};

export default LoginForm;
