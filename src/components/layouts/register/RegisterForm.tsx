"use client";

import React, { useState } from "react";
import axios from "axios";
import { AUTH_REGISTER_ENDPOINT } from "@/constants/api";
import RegisterButton from "./RegisterButton";
import { User } from "@/types/user";
import { loginCall } from "@/app/actionCalls";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useAuth } from "@/hooks/useAuth";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const dispatch = useAppDispatch();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("パスワードが一致しません");
      return;
    }

    try {
      await axios.post(AUTH_REGISTER_ENDPOINT, { username, email, password });
      alert("ユーザーを登録しました。");
      const userData: User = await loginCall({ email, password, dispatch });
      login(userData);
    } catch (err) {
      alert("ユーザー登録に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <form
      className="w-full max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <p className="text-center font-semibold text-xl text-gray-800">
        新規登録はこちら
      </p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="ユーザ名"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Eメール"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="パスワード"
        required
        minLength={6}
      />
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        className="h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="確認用パスワード"
        required
        minLength={6}
      />
      <RegisterButton />
    </form>
  );
};

export default RegisterForm;
