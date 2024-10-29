import React from "react";
import Topbar from "@/components/layouts/header/Header";
import AllUsers from "@/components/layouts/allUsers/AllUsers";
import Footer from "@/components/layouts/footer/Footer";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";

function Users() {
  return (
    <>
      <ClientComponent>
        <Topbar />
        <AllUsers />
        <Footer />
      </ClientComponent>
    </>
  );
}

export default Users;
