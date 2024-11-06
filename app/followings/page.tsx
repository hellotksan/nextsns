import React from "react";
import Topbar from "@/components/layouts/header/Header";
import FollowingUsersComponent from "@/components/layouts/followingUsers/FollowingUsers";

function Followers() {
  return (
    <>
      <Topbar />
      <FollowingUsersComponent />
    </>
  );
}

export default Followers;
