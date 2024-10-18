"use client";

import { AuthContext } from "@/state/AuthContext";
import React, { useContext } from "react";

// components
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Timeline from "@/components/layouts/timeline/Timeline";
import Loading from "@/components/layouts/loading/Loading";
import Sidebar from "@/components/layouts/leftbar/Leftbar";
import Topbar from "@/components/layouts/header/Header";
import Error from "@/components/layouts/error/Error";

function Home() {
  const { user, isFetching, error } = useContext(AuthContext);

  if (!user) {
    return <UserNotFound />;
  }
  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <>
      <Topbar />
      <Sidebar />
      <Timeline toHome={true} />
    </>
  );
}

export default Home;
