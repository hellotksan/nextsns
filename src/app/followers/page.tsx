import React from "react";
import Topbar from "@/components/layouts/header/Header";
import FollowersComponent from "@/components/layouts/followers/Followers";

const FollowersPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <div className="max-w-[480px] xl:w-[480px] mx-auto">
        <FollowersComponent />
      </div>
    </div>
  );
};

export default FollowersPage;
