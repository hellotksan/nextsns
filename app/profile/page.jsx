"use client";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/state/AuthContext";
import { redirect } from "next/navigation";
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Timeline from "@/components/layouts/timeline/Timeline";
import Loading from "@/components/layouts/loading/Loading";
import Topbar from "@/components/layouts/header/Header";
import Error from "@/components/layouts/error/Error";
import ShowProfile from "@/features/profile/Profile";
import { useSearchParams } from "next/navigation";

function Profile() {
  const { user, isFetching, error } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  // クエリがない場合にリダイレクト
  useEffect(() => {
    if (!username) {
      alert("ユーザーが存在しません。");
      redirect("/");
    }
  }, [username]);

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
      <ShowProfile username={username} />
      <Timeline username={username} />
    </>
  );
}

export default Profile;
