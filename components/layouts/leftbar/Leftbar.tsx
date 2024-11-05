import React from "react";
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

const sidebarItemsWithNoUser: SidebarItemProps[] = [
  { name: "ホーム", icon: <Home />, link: "/" },
  { name: "全ユーザー", icon: <GroupsIcon />, link: "/all-users" },
];

const SidebarItem: React.FC<{
  item: SidebarItemProps;
  user: User | null;
}> = ({ item, user }) => (
  <Link
    href={typeof item.link === "function" ? item.link(user!) : item.link}
    passHref
  >
    <li className="flex items-center mb-2 p-2 shadow-lg rounded hover:bg-gray-400 transition-all w-auto max-w-96">
      <span className="text-2xl mr-3" aria-label={`${item.name} icon`}>
        {item.icon}
      </span>
      <span className="text-xl">{item.name}</span>
    </li>
  </Link>
);

function Sidebar() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="fixed mt-12 h-screen z-50 ml-5 w-[300px] max-w-[300px] transition-width duration-300 ease-in-out overflow-hidden">
      <div className="p-5 z-30 max-w-96">
        {user ? (
          <ul className="list-none p-0 m-0">
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} item={item} user={user} />
            ))}
          </ul>
        ) : (
          <ul className="list-none p-0 m-0">
            {sidebarItemsWithNoUser.map((item, index) => (
              <SidebarItem key={index} item={item} user={null} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
