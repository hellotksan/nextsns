"use client";

import {
  Chat,
  Notifications,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { AuthContext } from "@/state/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/layouts/leftbar/Leftbar";
import styles from "./Header.module.css";

function Topbar() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");
    if (confirmLogout) {
      try {
        Cookies.remove("user", { path: "/" });
        router.push("/login");
      } catch (error) {
        alert("ログアウトに失敗しました。もう一度お試しください。");
      }
    }
  };

  return (
    <div className="bg-blue-800 h-12 w-full flex items-center sticky top-0 z-20">
      {/* ハンバーガーメニューアイコン - モバイル専用 */}
      <button
        onClick={toggleSidebar}
        className="ml-5 z-20 lg:hidden"
        aria-label="ham-menu"
      >
        {isSidebarOpen ? (
          <CloseIcon className="text-white" />
        ) : (
          <MenuIcon className="text-white" />
        )}
      </button>

      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>

      {/* モバイルサイズでサイドバーをトグル */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
          <Sidebar />
        </div>
      )}

      {/* 左側のロゴ */}
      <div className="flex-1 ml-5">
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="text-white font-bold text-2xl">Next SNS</span>
        </Link>
      </div>

      {/* 右側のアイコンとログアウトボタン */}
      <div className="flex-1 flex items-center justify-end space-x-4 text-white mr-5">
        <div>
          <Chat className="w-8 h-8 no-underline text-white" />
        </div>
        <div>
          <Notifications className="w-8 h-8 no-underline text-white" />
        </div>
        <Link
          href={{
            pathname: "/profile",
            query: user?.username ? { username: user.username } : {},
          }}
          className="no-underline text-black"
        >
          {/* <Link
          href={`/profile/${user.username}`}
          style={{ textDecoration: "none", color: "black" }}
        > */}
          {user.profilePicture ? (
            <Image
              src={`/assets/person/${user.profilePicture}`}
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
