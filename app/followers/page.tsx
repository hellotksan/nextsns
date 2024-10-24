import React from "react";
import Topbar from "@/components/layouts/header/Header";
import Friends from "@/features/friends/Friends";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";

function Followers() {
  return (
    <>
      <ClientComponent>
        <Topbar />
        <Friends />
      </ClientComponent>
    </>
  );
}

export default Followers;
