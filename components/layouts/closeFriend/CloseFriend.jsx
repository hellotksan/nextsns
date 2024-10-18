"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../state/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// module css files
import styles from "./CloseFriend.module.css";

function CloseFriend() {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const { user } = useContext(AuthContext);
  const [followingFriends, setFollowingFriends] = useState([]);

  useEffect(() => {
    const fetchFollowingFriends = async () => {
      if (user && user.followings) {
        try {
          const friendsPromises = user.followings.map((id) =>
            axios.get(`${PUBLIC_FOLDER}/api/users/${id}`)
          );
          const friendsResponses = await Promise.all(friendsPromises);
          const friendsData = friendsResponses.map((response) => response.data);
          setFollowingFriends(friendsData);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchFollowingFriends();
  }, [user, PUBLIC_FOLDER]);

  return (
    <div>
      <h4 className={styles.rightbarTitle}>あなたの友達</h4>
      <div className={styles.rightbarFriendList}>
        {followingFriends.map((friend) => (
          <Link
            href={`/profile/${friend.username}`}
            key={friend._id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.rightbarFriend} key={friend._id}>
              {friend.profilePicture ? (
                <Image
                  src={`${PUBLIC_FOLDER}/images/${friend.profilePicture}`}
                  alt=""
                  className={styles.rightbarProfileImg}
                />
              ) : (
                <PersonIcon className={styles.rightProfileImg} />
              )}
              <span className={styles.rightbarUsername}>{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CloseFriend;
