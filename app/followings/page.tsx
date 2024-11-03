import React from "react";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";
import Topbar from "@/components/layouts/header/Header";
import FollowingUsersComponent from "@/components/layouts/followingUsers/FollowingUsers";
import Footer from "@/components/layouts/footer/Footer";

function Followers() {
  return (
    <>
      <ClientComponent>
        <Topbar />
        <FollowingUsersComponent />
        <Footer />
      </ClientComponent>
    </>
  );
}

export default Followers;
