"use client";

import React, { useContext, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { AuthContext } from "@/state/AuthContext";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

function FollowersComponent() {
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
    <>
      <div className="flex justify-center p-4">
        <div className="w-full max-w-md">
          <h4 className="text-xl font-bold mb-4 text-center">フォロワー</h4>
          <div className="space-y-2">
            {followingFriends.map((friend) => (
              <Link
                href={{
                  pathname: "/profile",
                  query: friend?.username ? { username: friend.username } : {},
                }}
                key={friend._id}
                className="no-underline text-black flex items-center p-2 rounded hover:bg-gray-200 transition duration-200"
              >
                <div className="flex items-center" key={friend._id}>
                  {friend.profilePicture ? (
                    <Image
                      src={`/assets/person/${user.profilePicture}`}
                      alt="user-profile-picture"
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <PersonIcon
                      className="text-gray-500"
                      style={{ width: 32, height: 32 }}
                    />
                  )}
                  <span className="ml-2 text-lg">{friend.username}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FollowersComponent;
