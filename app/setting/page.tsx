import React from "react";
import SettingComponent from "@/components/layouts/setting/Setting";
import Topbar from "@/components/layouts/header/Header";
import SideBar from "@/components/layouts/sideBar/SideBar";

const Setting: React.FC = () => {
  return (
    <>
      <Topbar />
      <div className="hidden xl:block">
        <SideBar />
      </div>
      <SettingComponent />
    </>
  );
};

export default Setting;
