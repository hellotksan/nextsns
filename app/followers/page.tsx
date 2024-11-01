import React from "react";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";
import FollowersComponent from "@/components/layouts/followers/Followers";
import Topbar from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

function Followers() {
  return (
    <>
      <ClientComponent>
        <Topbar />
        <FollowersComponent />
        <Footer />
      </ClientComponent>
    </>
  );
}

export default Followers;
