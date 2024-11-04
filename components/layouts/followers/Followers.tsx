"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useSelector";
import useFollowers from "@/hooks/useFollowers";
import PersonIcon from "@mui/icons-material/Person";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import Error from "@/components/layouts/error/Error";

function FollowersComponent() {
  const { user } = useAppSelector((state) => state.auth);
  const { followingFriends, loading, error } = useFollowers(
    user?.followings || []
  );

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error />
      ) : (
        <div className="flex justify-center p-4">
          <div className="w-full max-w-md">
            <h4 className="text-xl font-bold mb-4 text-center">フォロワー</h4>
            <div className="space-y-2">
              {followingFriends.map((friend) => (
                <Link
                  href={{
                    pathname: "/profile",
                    query: friend?.username
                      ? { username: friend.username }
                      : {},
                  }}
                  key={friend._id}
                  className="no-underline flex items-center p-2 rounded hover:bg-gray-800 transition duration-200"
                >
                  <div className="flex items-center" key={friend._id}>
                    {friend.profilePicture ? (
                      <Image
                        src={`/assets/person/${friend.profilePicture}`}
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
      )}
    </>
  );
}

export default FollowersComponent;
