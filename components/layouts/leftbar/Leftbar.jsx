import React from "react";
import Link from "next/link";
import { Home, Person, Settings } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import styles from "./Leftbar.module.css";
import { useAppSelector } from "@/hooks/useSelector";

const sidebarItems = [
  { name: "ホーム", icon: <Home />, link: "/" },
  {
    name: "プロフィール",
    icon: <Person />,
    link: (user) =>
      user?.username
        ? { pathname: "/profile", query: { username: user.username } }
        : { pathname: "/login", query: {} },
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

function Sidebar() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={styles.sidebar}>
      <div className="p-5 z-30 max-w-96">
        <ul className="list-none p-0 m-0">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={
                typeof item.link === "function" ? item.link(user) : item.link
              }
              passHref
            >
              <li className="flex items-center mb-2 p-2 shadow-lg bg-white rounded hover:bg-blue-100 transition-all w-auto max-w-96">
                <span
                  className="text-2xl mr-3"
                  aria-label={`${item.name} icon`}
                >
                  {item.icon}
                </span>
                <span className={styles.linkname}>{item.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
