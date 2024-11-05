"use client";

import React from "react";
import Timeline from "@/components/layouts/timeline/Timeline";
import Topbar from "@/components/layouts/header/Header";
import { useAppSelector } from "@/hooks/useSelector";
import GuestTimeline from "@/components/layouts/guestTimeline/GuestTimeline";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Topbar />
      {user ? (
        <Timeline toHome={true} username={undefined} />
      ) : (
        <GuestTimeline />
      )}
    </>
  );
};

export default Home;
