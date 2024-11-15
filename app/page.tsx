import Link from "next/link";
import React from "react";

const RootPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Next SNS
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg text-center">
            NextJs と NodeJs と MongoDB を使用して作成された SNS
            クローンアプリケーションです。
          </p>
        </div>

        <div>
          <ul className="space-y-4">
            <li>
              <Link
                href="/home"
                className="block text-center text-blue-500 hover:underline"
              >
                ログインしないで使う方はこちらから
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block text-center text-blue-500 hover:underline"
              >
                ログインはこちらから
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="block text-center text-blue-500 hover:underline"
              >
                新規登録はこちらから
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/hellotksan/nextsns"
                className="block text-center text-blue-500 hover:underline"
              >
                GithubのURLはこちらから
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/hellotksan/nextsns/commit/main"
                className="block text-center text-blue-500 hover:underline"
              >
                アップデート情報はこちらから
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RootPage;
