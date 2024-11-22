import React from "react";
import Topbar from "@/components/layouts/header/Header";
import FollowingUsersComponent from "@/components/layouts/followings/Followings";

const FollowingUsersPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <div className="max-w-xl mx-auto">
        <FollowingUsersComponent />
      </div>
    </div>
  );
};

export default FollowingUsersPage;
