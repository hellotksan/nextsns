"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/state/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const SettingComponent = () => {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?username=${user.username}`
        );
        setDesc(response.data.desc);
      } catch (error) {
        alert("ユーザ情報の取得に失敗しました。");
      }
    };
    fetchUser();
  }, [user.username, PUBLIC_FOLDER]);

  const handleEdit = async () => {
    try {
      if (window.confirm("本当に変更してもよろしいですか？")) {
        await axios.put(`${PUBLIC_FOLDER}/api/users/${user._id}`, {
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
        await axios.delete(`${PUBLIC_FOLDER}/api/users/${user._id}`, {
          data: {
            userId: user._id,
          },
        });
        alert("ユーザを削除しました。");
        Cookies.remove("user", { path: "/" });
        router.push("/login");
      } else {
        alert("ユーザ削除をキャンセルしました");
      }
    } catch (error) {
      alert("エラーが発生しました。");
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="profileRightTop p-6 bg-white shadow-md rounded-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">ユーザ設定</h2>
        <div className="space-y-4">
          <h4 className="text-lg font-medium">ユーザ名：{user.username}</h4>
          <div>
            <span className="text-lg font-medium">ユーザ情報：</span>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
