import { Home, Person, Settings } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { AuthContext } from "@/state/AuthContext";
import React, { useContext } from "react";
import Link from "next/link";
import styles from "./Leftbar.module.css";

const sidebarItems = [
  { name: "ホーム", icon: <Home />, link: "/" },
  {
    name: "プロフィール",
    icon: <Person />,
    link: (user) => (user?.username ? `/profile/${user.username}` : "/login"),
  },
  { name: "設定", icon: <Settings />, link: "/setting" },
  { name: "フォロワー", icon: <PersonAddAlt1Icon />, link: "/followers" },
  { name: "全ユーザー", icon: <GroupsIcon />, link: "/users" },
];

function Sidebar() {
  const { user } = useContext(AuthContext);

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
