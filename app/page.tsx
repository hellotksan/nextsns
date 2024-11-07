import React from "react";
import Topbar from "@/components/layouts/header/Header";
import TimelineWrapper from "@/components/layouts/timeline/TimelineWrapper";
import SideBar from "@/components/layouts/sideBar/SideBar";

const HomePage = () => {
  return (
    <>
      <Topbar />
      <div className="hidden xl:block">
        <SideBar />
      </div>
      <TimelineWrapper />
    </>
  );
};

export default HomePage;
