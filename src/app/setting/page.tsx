import React from "react";
import SettingComponent from "@/components/layouts/setting/Setting";
import Topbar from "@/components/layouts/header/Header";

const SettingPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <div className="min-w-96 max-w-xl mx-auto">
        <SettingComponent />
      </div>
    </div>
  );
};

export default SettingPage;
