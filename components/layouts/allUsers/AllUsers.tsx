"use client";

import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import Error from "@/components/layouts/error/Error";
import useUsers from "@/hooks/useUsers";
import { User } from "@/types/user";

const AllUsers: React.FC = () => {
  const { users, loading, error } = useUsers();

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error />
      ) : (
        <div className="flex justify-center p-4">
          <div className="w-full max-w-md">
            <h4 className="text-xl font-bold mb-4 text-center">全ユーザー</h4>
            <div className="space-y-2">
              {users.map((user: User) => (
                <Link
                  href={{
                    pathname: "/profile",
                    query: user?.username ? { username: user.username } : {},
                  }}
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
      )}
    </>
  );
};

export default AllUsers;
