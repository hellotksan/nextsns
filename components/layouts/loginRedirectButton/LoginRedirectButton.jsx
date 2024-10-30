import React from "react";

function LoginRedirectButton({ onClick }) {
  return (
    <div className="flex flex-col justify-center flex-1">
      <p className="text-center font-semibold text-lg mb-2 text-white">
        すでにアカウントをお持ちの方はこちら
      </p>
      <button
        className="h-12 w-3/5 self-center rounded-lg border-none bg-green-700 text-white text-lg font-medium cursor-pointer hover:bg-green-800 transition-colors"
        onClick={onClick}
      >
        ログイン
      </button>
    </div>
  );
}

export default LoginRedirectButton;
