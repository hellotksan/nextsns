import React from "react";
import FollowersComponent from "@/components/layouts/followers/Followers";
import Topbar from "@/components/layouts/header/Header";

function Followers() {
  return (
    <>
      <Topbar />
      <FollowersComponent />
    </>
  );
}

export default Followers;
