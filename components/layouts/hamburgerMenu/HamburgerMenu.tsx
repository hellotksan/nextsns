import React, { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useSelector";
import { User } from "@/types/user";
import { Home, Person, Settings, Menu as MenuIcon } from "@mui/icons-material";
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

  return (
    <div className="md:hidden relative">
      {/* ハンバーガーボタン */}
      <button
        onClick={toggleMenu}
        className="p-2 ml-2 bg-gray-700 text-white rounded focus:outline-none"
      >
        {/* 三本線のアイコン */}
        <MenuIcon className="text-white" />
      </button>

      {/* メニューアイテム */}
      {isOpen && (
        <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50">
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
                  <div className="flex items-center p-2 text-gray-800 hover:bg-gray-100 rounded transition-all">
                    <span
                      className="text-2xl mr-3"
                      aria-label={`${item.name} icon`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-lg">{item.name}</span>
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
