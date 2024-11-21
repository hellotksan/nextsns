import React from "react";
import Topbar from "@/components/layouts/header/Header";
import TimelineWrapper from "@/components/layouts/timeline/TimelineWrapper";

const HomePage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <div className="max-w-xl mx-auto">
        <TimelineWrapper />
      </div>
    </div>
  );
};

export default HomePage;
