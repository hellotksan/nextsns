"use client";

import React from "react";
import Timeline from "./Timeline";
import GuestTimeline from "./GuestTimeline";
import { useAppSelector } from "@/hooks/useSelector";

const TimelineWrapper = () => {
  const { user } = useAppSelector((state) => state.auth);

  return user ? (
    <Timeline toHome={true} username={undefined} />
  ) : (
    <GuestTimeline />
  );
};

export default TimelineWrapper;
