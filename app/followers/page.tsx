import React from "react";
import FollowersComponent from "@/components/layouts/followers/Followers";
import Topbar from "@/components/layouts/header/Header";
import SideBar from "@/components/layouts/sideBar/SideBar";

function Followers() {
  return (
    <>
      <Topbar />
      <div className="hidden xl:block">
        <SideBar />
      </div>
      <FollowersComponent />
    </>
  );
}

export default Followers;
