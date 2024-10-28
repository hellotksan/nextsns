import React from "react";
import Timeline from "@/components/layouts/timeline/Timeline";
import Topbar from "@/components/layouts/header/Header";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";

function Home() {
  return (
    <>
      <ClientComponent>
        <Topbar />
        <Timeline toHome={true} username={undefined} />
      </ClientComponent>
    </>
  );
}

export default Home;
