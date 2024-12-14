"use client";

import React from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import * as Feedback from "@/components/shared/feedback/index";
import useAllUsers from "@/hooks/useAllUsers";
import { User } from "@/types/user";
import PersonIcon from "@mui/icons-material/Person";
import RocketIcon from "@mui/icons-material/Rocket";

const AllUsersComponent: React.FC = () => {
  const { users, loading, error } = useAllUsers();

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Feedback.Error />
      ) : (
        <div className="w-full flex justify-center p-4">
          <div className="w-96">
            <h4 className="text-xl font-bold mb-4 text-center">全ユーザー</h4>
            <div className="space-y-4">
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
                    {user.profilePicture ? <RocketIcon /> : <PersonIcon />}
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

export default AllUsersComponent;
