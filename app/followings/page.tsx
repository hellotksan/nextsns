import React from "react";
import Topbar from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import FollowingUsersComponent from "@/features/followingUsers/FollowingUsers";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";

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
