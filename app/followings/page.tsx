import React from "react";
import Topbar from "@/components/layouts/header/Header";
import FollowingUsersComponent from "@/components/layouts/followingUsers/FollowingUsers";
import SideBar from "@/components/layouts/sideBar/SideBar";

function Followers() {
  return (
    <>
      <Topbar />
      <div className="hidden xl:block">
        <SideBar />
      </div>
      <FollowingUsersComponent />
    </>
  );
}

export default Followers;
