"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { USERS_ENDPOINT } from "@/constants/api";
import { useAppSelector } from "@/hooks/useSelector";
import { User } from "@/types/user";

const SettingComponent: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth) as { user: User };
  const [desc, setDesc] = useState<string>(user?.desc || "");
  const router = useRouter();

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
    } catch (error) {
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
        Cookies.remove("user", { path: "/" });
        router.replace("/login");
      } else {
        alert("ユーザ削除をキャンセルしました");
      }
    } catch (error) {
      alert("エラーが発生しました。");
    }
  };

  if (!user) return null;

  return (
    <div className="flex justify-center p-6 rounded-lg shadow-2xl max-w-2xl min-h-screen mx-auto">
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">ユーザ設定</h2>
        <div className="space-y-4">
          <h4 className="text-lg font-medium">ユーザ名：{user?.username}</h4>
          <div>
            <span className="text-lg font-medium">ユーザ情報：</span>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows={3}
            />
          </div>
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