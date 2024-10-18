"use client";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SettingComponent = ({ username }) => {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?username=${username}`
        );
        setDesc(response.data.desc);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [username, PUBLIC_FOLDER]);

  const handleEdit = async () => {
    try {
      if (user.username === username) {
        if (window.confirm("本当に変更してもよろしいですか？")) {
          await axios.put(`${PUBLIC_FOLDER}/api/users/${user._id}`, {
            userId: user._id,
            desc: desc,
          });
          alert("ユーザ情報を更新しました");
        } else {
          alert("変更をキャンセルしました。");
        }
      } else {
        alert("編集権限がありません");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (user.username === username) {
        if (window.confirm("本当に削除してもよろしいですか？")) {
          await axios.delete(`${PUBLIC_FOLDER}/api/users/${user._id}`, {
            data: {
              userId: user._id,
            },
          });
          alert("ユーザを削除しました。");
          Cookies.remove("user", { path: "/" });
          router.push("/login");
          window.location.reload();
        } else {
          alert("ユーザ削除をキャンセルしました");
        }
      } else {
        alert("削除権限がありません。");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profileRightTop p-6 bg-white shadow-md rounded-md">
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
  );
};

export default SettingComponent;
