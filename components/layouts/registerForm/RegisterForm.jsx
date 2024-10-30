import React, { useRef } from "react";

function RegisterForm({ onSubmit }) {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // パスワードと確認用のパスワードがあっているか確認
    if (password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity("パスワードが違います");
    } else {
      passwordConfirmation.current.setCustomValidity("");
      onSubmit({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
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
        className="h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="ユーザ名"
        required
        ref={username}
      />
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
      <input
        type="password"
        className="h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="確認用パスワード"
        required
        minLength="6"
        ref={passwordConfirmation}
      />
      <button
        type="submit"
        className="h-12 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
      >
        サインアップ
      </button>
    </form>
  );
}

export default RegisterForm;
