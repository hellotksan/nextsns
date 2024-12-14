"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { USERS_ENDPOINT } from "@/constants/api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SettingComponent: React.FC = () => {
  const { user, logoutUser } = useAuth();
  const [desc, setDesc] = useState<string>(user?.desc || "");
  const router = useRouter();

  if (!user) return null;

  const handleEdit = async () => {
    try {
      if (window.confirm("本当に変更してもよろしいですか？")) {
        await axios.put(`${USERS_ENDPOINT}/${user._id}`, {
          userId: user._id,
          desc: desc,
        });
        alert("ユーザ情報を更新しました");
      } else {
        alert("変更をキャンセルしました。");
      }
    } catch (err) {
      alert("エラーが発生しました。");
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm("本当に削除してもよろしいですか？")) {
        await axios.delete(`${USERS_ENDPOINT}/${user._id}`, {
          data: {
            userId: user._id,
          },
        });
        alert("ユーザを削除しました。");
        logoutUser();
        router.replace("/");
      } else {
        alert("ユーザ削除をキャンセルしました");
      }
    } catch (err) {
      alert("エラーが発生しました。");
    }
  };

  return (
    <div className="w-full flex justify-center p-3 max-w-xl min-h-screen mx-auto">
      <div className="p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">ユーザー設定</h2>
        <div className="space-y-3">
          <div className="text-lg font-medium">
            ユーザー名：{user?.username}
          </div>
          <div className="text-lg font-medium">ユーザー情報：</div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            rows={2}
          />
          <div className="flex space-x-4">
            <Button
              onClick={handleEdit}
              variant="outline"
              className="hover:bg-gray-300"
            >
              Edit
            </Button>
            {/* TODO: アカウント削除時にもう一度メールアドレスとパスワードで認証すること。 */}
            {/* <Button
              onClick={handleDelete}
              variant="outline"
              className="text-white bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button> */}
          </div>
        </div>
        <div className="mt-5">
          <Link
            href="#"
            onClick={() => alert("現在、アカウントの削除はできません。")}
            className="hover:underline"
          >
            アカウント削除はこちらから
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingComponent;
