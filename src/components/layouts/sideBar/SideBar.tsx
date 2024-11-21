"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useSelector";
import { User } from "@/types/user";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Home, Person, Settings } from "@mui/icons-material";
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

const SidebarItem: React.FC<{
  item: SidebarItemProps;
  user: User | null;
}> = ({ item, user }) => (
  <li className="flex items-center my-2 p-2 border-2 rounded hover:bg-gray-400 transition-all w-auto max-w-96">
    <Link
      href={typeof item.link === "function" ? item.link(user!) : item.link}
      passHref
      className="flex items-center w-full"
    >
      <span className="text-2xl mr-3" aria-label={`${item.name} icon`}>
        {item.icon}
      </span>
      <span className="text-xl">{item.name}</span>
    </Link>
  </li>
);

const SideBar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみ処理を行う
  useEffect(() => {
    setIsClient(true); // クライアントサイドでのレンダリングを開始
  }, []);

  // サーバーサイドではレンダリングしない
  if (!isClient || !user) {
    return null; // またはローディングインジケーターなどを表示
  }

  return (
    <div className="fixed top-16 h-screen ml-5 w-[320px] max-w-[320px] transition-all duration-300 ease-in-out overflow-hidden">
      <div className="p-5 max-w-full">
        <ul className="list-none p-0 m-0">
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} item={item} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
