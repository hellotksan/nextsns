"use client";

import React, { useContext, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { AuthContext } from "../../state/AuthContext";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import styles from "./index.css";

const AllFriend = () => {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const [users, setUsers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${PUBLIC_FOLDER}/api/users/all`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [PUBLIC_FOLDER]);

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h4 className={styles.rightbarTitle}>全ユーザー</h4>
      <div className={styles.rightbarFriendList}>
        {users.map((user) => (
          <Link
            href={`/profile/${user.username}`}
            key={user._id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.rightbarFriend} key={user._id}>
              {user.profilePicture ? (
                <Image
                  src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
                  alt=""
                  className={styles.rightbarProfileImg}
                  width={32}
                  height={32}
                />
              ) : (
                <PersonIcon className={styles.rightbarProfileImg} />
              )}
              <span className={styles.rightbarUsername}>{user.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllFriend;
