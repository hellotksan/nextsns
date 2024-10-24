"use client";

import React from "react";
import Topbar from "@/components/layouts/header/Header";
import SettingComponent from "@/features/setting/Setting";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";

function Setting() {
  return (
    <>
      <ClientComponent>
        <Topbar />
        <SettingComponent />
      </ClientComponent>
    </>
  );
}

export default Setting;
