import React from "react";
import Topbar from "@/components/layouts/header/Header";
import AllUsers from "@/components/layouts/allUsers/AllUsers";
import SideBar from "@/components/layouts/sideBar/SideBar";

function Users() {
  return (
    <>
      <Topbar />
      <div className="hidden xl:block">
        <SideBar />
      </div>
      <AllUsers />
    </>
  );
}

export default Users;
