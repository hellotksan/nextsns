import React from "react";
import SettingComponent from "@/components/layouts/setting/Setting";
import Topbar from "@/components/layouts/header/Header";

const Setting: React.FC = () => {
  return (
    <>
      <Topbar />
      <SettingComponent />
    </>
  );
};

export default Setting;
