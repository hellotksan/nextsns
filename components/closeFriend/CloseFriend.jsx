"use client";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import Link from "next/link";

// 友達の情報を表示
function CloseFriend() {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const { user, isFetching, error } = useContext(AuthContext);
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

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h4 className="rightbarTitle">あなたの友達</h4>
      <div className="rightbarFriendList">
        {followingFriends.map((friend) => (
          <Link
            href={`/profile/${friend.username}`}
            key={friend._id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="rightbarFriend" key={friend._id}>
              {friend.profilePicture ? (
                <Image
                  src={`${PUBLIC_FOLDER}/images/${friend.profilePicture}`}
                  alt=""
                  className="rightbarProfileImg"
                />
              ) : (
                <PersonIcon className="rightProfileImg" />
              )}
              <span className="rightbarUsername">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CloseFriend;
