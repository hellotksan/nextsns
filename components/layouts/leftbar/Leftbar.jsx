import { Home, Person, Settings } from "@mui/icons-material";
import { AuthContext } from "@/state/AuthContext";
import React, { useContext } from "react";
import Link from "next/link";

const sidebarItems = [
  { name: "ホーム", icon: <Home />, link: "/" },
  {
    name: "プロフィール",
    icon: <Person />,
    link: (user) => (user?.username ? `/profile/${user.username}` : "/login"),
  },
  {
    name: "設定",
    icon: <Settings />,
    link: (user) => (user?.username ? `/setting/${user.username}` : "/login"),
  },
  { name: "フォロワー", icon: <Person />, link: "/followers" },
  { name: "全ユーザー", icon: <Person />, link: "/users" },
];

function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed mt-10 h-screen z-50 ml-40 md:w-auto lg:w-auto xl:w-1/5">
      <div className="p-5">
        <ul className="list-none p-0 m-0">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={
                typeof item.link === "function" ? item.link(user) : item.link
              }
              passHref
            >
              <li className="flex items-center mb-2 p-2 shadow-lg bg-white rounded hover:bg-blue-100 transition-all cursor-pointer">
                <span
                  className="text-2xl mr-3"
                  aria-label={`${item.name} icon`}
                >
                  {item.icon}
                </span>
                {/* 1340px以上ではitem.nameを表示、それ以下では非表示 */}
                <span
                  className={`text-xl ${
                    window.innerWidth <= 1340 ? "hidden" : ""
                  }`}
                >
                  {item.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
