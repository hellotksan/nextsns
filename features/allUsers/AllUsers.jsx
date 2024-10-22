"use client";

import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import Image from "next/image";
import Link from "next/link";

// hooks
import useUsers from "../../hooks/useUsers";

// using allUsers features
const AllUsers = () => {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const { users, loading, error } = useUsers(PUBLIC_FOLDER);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>エラーが発生しました: </div>;

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md">
        <h4 className="text-xl font-bold mb-4 text-center">全ユーザー</h4>
        <div className="space-y-2">
          {users.map((user) => (
            <Link
              href={`/profile/${user.username}`}
              key={user._id}
              className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200"
            >
              <div className="flex items-center">
                {user.profilePicture ? (
                  <Image
                    src={`/assets/person/${user.profilePicture}`}
                    alt={user.username}
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
                <span className="ml-2 text-lg">{user.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AllUsers;
