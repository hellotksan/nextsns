import React from "react";
import Link from "next/link";

function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4 text-xl font-semibold text-gray-700">
        ユーザ情報がありません。ログインしてください。
      </div>
      <div>
        <Link
          href="/login"
          className="text-blue-500 underline hover:text-blue-700"
        >
          <span>ログインはこちら</span>
        </Link>
      </div>
    </div>
  );
}

export default UserNotFound;
