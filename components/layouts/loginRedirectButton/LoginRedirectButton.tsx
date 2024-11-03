import React from "react";

interface LoginRedirectButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoginRedirectButton: React.FC<LoginRedirectButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col justify-center flex-1">
      <p className="text-center font-semibold text-lg mb-2 text-white">
        すでにアカウントをお持ちの方はこちら
      </p>
      <button
        className={`h-12 w-3/5 self-center rounded-lg border-none text-lg font-medium cursor-pointer transition-colors ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-700 hover:bg-green-800"
        } text-white`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-label="ログインボタン"
      >
        ログイン
      </button>
    </div>
  );
};

export default LoginRedirectButton;
