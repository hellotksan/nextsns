import React, { useEffect, useRef } from "react";

function LoginForm({ onSubmit }) {
  const email = useRef();
  const password = useRef();

  useEffect(() => {
    // 自動でメールフィールドにフォーカスを当てる
    email.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    onSubmit(emailValue, passwordValue);
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
        ref={email}
      />
      <input
        type="password"
        className="h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="パスワード"
        required
        minLength="6"
        ref={password}
      />
      <button className="h-12 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
        ログイン
      </button>
      <span className="text-center text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors disabled:">
        パスワードを忘れた方へ
      </span>
    </form>
  );
}

export default LoginForm;
