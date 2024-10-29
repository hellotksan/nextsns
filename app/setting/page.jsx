import React from "react";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";
import SettingComponent from "@/components/layouts/setting/Setting";
import Topbar from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

function Setting() {
  return (
    <>
      <ClientComponent>
        <Topbar />
        <SettingComponent />
        <Footer />
      </ClientComponent>
    </>
  );
}

export default Setting;
