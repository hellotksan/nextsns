"use client";

import React from "react";
import Topbar from "@/components/layouts/header/Header";
import SettingComponent from "@/features/setting/Setting";
import Footer from "@/components/layouts/footer/Footer";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";

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
