import { AuthContext } from "../../../state/AuthContext";
import React, { useContext } from "react";
import Link from "next/link";
import {
  // Bookmark,
  Home,
  // Notifications,
  // MessageRounded,
  Person,
  // Search,
  Settings,
} from "@mui/icons-material";

// module css files
import styles from "./Leftbar.module.css";

function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <ul className={styles.sidebarList}>
          <Link href="/" style={{ textDecoration: "none", color: "black" }}>
            <li className={styles.sidebarListItem}>
              <Home className={styles.sidebarIcon} />
              <span className={styles.sidebarListItemText}>ホーム</span>
            </li>
          </Link>

          {/* <li className="sidebarListItem">
            <Search className="sidebarIcon" />
            <span className="sidebarListItemText">検索</span>
          </li>

          <li className="sidebarListItem">
            <Notifications className="sidebarIcon" />
            <span className="sidebarListItemText">通知</span>
          </li>

          <li className="sidebarListItem">
            <MessageRounded className="sidebarIcon" />
            <span className="sidebarListItemText">メッセージ</span>
          </li>

          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">ブックマーク</span>
          </li> */}

          <Link
            href={`/profile/${user.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className={styles.sidebarListItem}>
              <Person className={styles.sidebarIcon} />
              <span className={styles.sidebarListItemText}>プロフィール</span>
            </li>
          </Link>

          <Link
            href={`/setting/${user.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className={styles.sidebarListItem}>
              <Settings className={styles.sidebarIcon} />
              <span className={styles.sidebarListItemText}>設定</span>
            </li>
          </Link>

          <Link
            href={`/followers`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className={styles.sidebarListItem}>
              <Person className={styles.sidebarIcon} />
              <span className={styles.sidebarListItemText}>フォロワー</span>
            </li>
          </Link>

          <Link
            href={`/users`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className={styles.sidebarListItem}>
              <Person className={styles.sidebarIcon} />
              <span className={styles.sidebarListItemText}>全ユーザー</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
