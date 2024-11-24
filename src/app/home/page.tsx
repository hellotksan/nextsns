import React from "react";
import Topbar from "@/components/layouts/header/Header";
import HomeTimeline from "@/components/layouts/timeline/HomeTimeline";

const HomePage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <div className="max-w-[480px] xl:w-[480px] mx-auto">
        <HomeTimeline isForm={true} />
      </div>
    </div>
  );
};

export default HomePage;
