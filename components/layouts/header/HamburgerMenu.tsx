import React, { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useSelector";
import { User } from "@/types/user";
import {
  Home,
  Person,
  Settings,
  Close as CloseIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupsIcon from "@mui/icons-material/Groups";

interface SidebarItemProps {
  name: string;
  icon: JSX.Element;
  link:
    | string
    | ((user: User) => { pathname: string; query?: Record<string, string> });
}

const sidebarItems: SidebarItemProps[] = [
  { name: "ホーム", icon: <Home />, link: "/" },
  {
    name: "プロフィール",
    icon: <Person />,
    link: (user: User) =>
      user?.username
        ? { pathname: "/profile", query: { username: user.username } }
        : { pathname: "/login" },
  },
  { name: "設定", icon: <Settings />, link: "/setting" },
  { name: "フォロワー", icon: <PersonAddAlt1Icon />, link: "/followers" },
  {
    name: "フォロー中のユーザー",
    icon: <PersonAddAlt1Icon />,
    link: "/followings",
  },
  { name: "全ユーザー", icon: <GroupsIcon />, link: "/all-users" },
];

const HamburgerMenu: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* ハンバーガーボタン */}
      <button
        onClick={toggleMenu}
        className="p-2 ml-2 rounded focus:outline-none"
        aria-label="Toggle menu"
      >
        {/* メニューアイコンの切り替え */}
        {isOpen ? (
          <CloseIcon className="text-2xl" />
        ) : (
          <MenuIcon className="text-2xl" />
        )}
      </button>

      {/* メニューアイテム */}
      {isOpen && (
        <div className="absolute bg-white top-12 left-0 shadow-lg rounded-lg p-4 w-72 z-10">
          <ul className="list-none p-0 m-0">
            {sidebarItems.map((item, index) => (
              <li key={index} className="mb-2">
                <Link
                  href={
                    typeof item.link === "function"
                      ? item.link(user!)
                      : item.link
                  }
                  passHref
                >
                  <div className="flex items-center p-2 hover:bg-gray-400 rounded transition-all">
                    <span
                      className="text-2xl mr-3 text-black"
                      aria-label={`${item.name} icon`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-lg text-black">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
