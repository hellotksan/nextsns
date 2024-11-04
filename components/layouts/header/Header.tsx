"use client";

import * as React from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HamburgerMenu from "@/components/layouts/hamburgerMenu/HamburgerMenu";
import Sidebar from "@/components/layouts/leftbar/Leftbar";
import { useAppSelector } from "@/hooks/useSelector";
import { Chat, Notifications } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Topbar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const { setTheme } = useTheme();

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");

    if (confirmLogout) {
      try {
        Cookies.remove("user", { path: "/" });
        router.replace("/login");
      } catch (error) {
        alert("ログアウトに失敗しました。もう一度お試しください。");
      }
    }
  };

  return (
    <div className="bg-gray-700 h-14 w-full flex items-center sticky top-0 z-50">
      <div className="hidden xl:block">
        <Sidebar />
      </div>

      {/* ハンバーガーメニュー（モバイル用） */}
      <div className="xl:hidden">
        <HamburgerMenu />
      </div>

      {/* 左側のロゴ */}
      <div className="flex-1 ml-5">
        <Link href="/" className="text-white font-bold text-2xl no-underline">
          Next SNS
        </Link>
      </div>

      {/* 右側のアイコンとログアウトボタン */}
      <div className="flex-1 flex items-center justify-end space-x-4 text-white mr-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="bg-gray-700">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Chat className="w-8 h-8" />
        <Notifications className="w-8 h-8" />
        <Link
          href={{
            pathname: "/profile",
            query: user?.username ? { username: user.username } : {},
          }}
          className="no-underline text-black"
        >
          {user?.profilePicture ? (
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
};

export default Topbar;
