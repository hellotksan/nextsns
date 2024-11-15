"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import Error from "@/components/layouts/error/Error";
import useAllUsers from "@/hooks/useAllUsers";
import { User } from "@/types/user";
import PersonIcon from "@mui/icons-material/Person";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const AllUsers: React.FC = () => {
  const { users, loading, error } = useAllUsers();

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
                  className="flex items-center p-2 rounded hover:bg-gray-300 transition duration-200"
                >
                  <div className="flex items-center">
                    {user.profilePicture ? (
                      <RocketLaunchIcon
                        fontSize="medium"
                        className="w-8 h-8 rounded-full"
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
