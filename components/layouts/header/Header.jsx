"use client";

import { Chat, Notifications, Search } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { AuthContext } from "@/state/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";

function Topbar() {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");
    if (confirmLogout) {
      try {
        Cookies.remove("user", { path: "/" });
        router.push("/login");
      } catch (error) {
        alert("ログアウトに失敗しました。もう一度お試しください。");
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-blue-800 h-12 w-full flex items-center sticky top-0 z-50">
      {/* 左側のロゴ */}
      <div className="flex-1 ml-5">
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="text-white font-bold text-2xl">Next SNS</span>
        </Link>
      </div>

      {/* 中央の検索バー */}
      {/* <div className="flex-1 hidden md:flex items-center">
        <div className="w-full h-8 bg-white rounded-full flex items-center px-3">
          <span className="material-icons text-gray-500"></span>
          <input
            type="text"
            placeholder="検索"
            className="w-full border-none focus:outline-none"
          />
        </div>
      </div> */}

      {/* 右側のアイコンとログアウトボタン */}
      <div className="flex-1 flex items-center justify-end space-x-4 text-white mr-5">
        <div>
          <Chat
            className="w-8 h-8"
            style={{ textDecoration: "none", color: "white" }}
          />
        </div>
        <div>
          <Notifications
            className="w-8 h-8"
            style={{ textDecoration: "none", color: "white" }}
          />
        </div>
        <Link
          href={`/profile/${user.username}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {user.profilePicture ? (
            <Image
              src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              width={32}
              height={32}
            />
          ) : (
            <PersonIcon
              className="w-8 h-8"
              style={{ textDecoration: "none", color: "white" }}
            />
          )}
        </Link>
        <button
          className="text-sm hover:text-pink-400 transition-colors"
          onClick={handleLogout}
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}

export default Topbar;
