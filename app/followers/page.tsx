import React from "react";
import Topbar from "@/components/layouts/header/Header";
import Friends from "@/features/friends/Friends";
import Footer from "@/components/layouts/footer/Footer";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";

function Followers() {
  return (
    <>
      <ClientComponent>
        <Topbar />
        <Friends />
        <Footer />
      </ClientComponent>
    </>
  );
}

export default Followers;
