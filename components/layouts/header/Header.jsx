"use client";

// import { Chat, Notifications, Search } from "@mui/icons-material";
import { AuthContext } from "../../../state/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";

// module css files
import styles from "./Header.module.css";

export default function Topbar() {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");
    if (confirmLogout) {
      try {
        Cookies.remove("user", { path: "/" });
        router.push("/login");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.topbarContainer}>
      <div className={styles.topbarLeft}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className={styles.logo}>Next SNS</span>
        </Link>
      </div>

      {/* <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchbar" />
          <input
            type="text"
            className="searchInput"
            placeholder="探し物は何ですか？"
          />
        </div>
      </div> */}

      <div className={styles.topbarRight}>
        <div className={styles.topbarIconItems}>
          {/* <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div> */}
          {/* <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">2</span>
          </div> */}
          <Link
            href={`/profile/${user.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {user.profilePicture ? (
              <Image
                src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
                alt=""
                className={styles.topbarImg}
                width={32}
                height={32}
              />
            ) : (
              <PersonIcon
                className={styles.topbarImg}
                style={{ textDecoration: "none", color: "white" }}
              />
            )}
            <span className={styles.topbarLogout}>{user.username}</span>
          </Link>
          <button className={styles.topbarLogout} onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
}
