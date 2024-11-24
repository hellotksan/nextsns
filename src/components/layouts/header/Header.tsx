"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

const Topbar: React.FC = () => {
  const router = useRouter();
  const { user, logoutUser } = useAuth();
  const { setTheme } = useTheme();

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");

    if (confirmLogout) {
      try {
        logoutUser();
        router.replace("/");
      } catch (error) {
        alert("ログアウトに失敗しました。もう一度お試しください。");
        router.refresh();
      }
    }
  };

  return (
    <div className="h-16 w-full flex items-center sticky top-0 z-20 backdrop-blur border-b border-gray-300">
      <SidebarTrigger className="ml-5"/>

      <div className="flex-1 flex items-center justify-start space-x-4 ml-5 xl:ml-60">
        <Link href="/home" className="ml-2 font-bold text-2xl no-underline">
          Next SNS
        </Link>
      </div>

      {/* 右側のアイコンとログアウトボタン */}
      <div className="flex-1 flex items-center justify-end space-x-4 mr-5 xl:mr-80">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
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

        <DropdownMenu>
          <DropdownMenuTrigger aria-label="user-icon">
            {user && user.profilePicture ? (
              <RocketLaunchIcon
                fontSize="medium"
                className="w-8 h-8 no-underline"
              />
            ) : (
              <PersonIcon fontSize="medium" className="w-8 h-8 no-underline" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {user ? (
              <>
                <DropdownMenuItem>
                  <Link
                    href={{
                      pathname: "/profile",
                      query: user.username ? { username: user.username } : {},
                    }}
                    className="no-underline"
                  >
                    <PersonOutlineIcon fontSize="medium" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogoutIcon />
                  Log out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem>
                <Link href={{ pathname: "/login" }} className="no-underline">
                  <LoginIcon className="mr-2" />
                  Login
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Topbar;
