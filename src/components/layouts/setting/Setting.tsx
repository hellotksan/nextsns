"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { USERS_ENDPOINT } from "@/constants/api";
import { useAuth } from "@/hooks/useAuth";

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
    <div className="w-full flex justify-center p-3 border-x-2 rounded-lg shadow-md max-w-xl min-h-screen mx-auto">
      <div className="p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">ユーザー設定</h2>
        <div className="space-y-2">
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
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              編集
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ユーザ削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingComponent;
