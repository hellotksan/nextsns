import React from "react";
import Topbar from "@/components/layouts/header/Header";
import AllUsers from "@/features/allUsers/AllUsers";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";

function Users() {
  return (
    <>
      <ClientComponent>
        <Topbar />
        <AllUsers />
      </ClientComponent>
    </>
  );
}

export default Users;
