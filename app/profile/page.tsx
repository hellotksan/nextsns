"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import ProfileComponent from "@/components/layouts/profile/Profile";
import Timeline from "@/components/layouts/timeline/Timeline";
import Topbar from "@/components/layouts/header/Header";

const ProfileContent: React.FC = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      alert("ユーザーが存在しません。");
      router.replace("/");
    }
  }, [username, router]);

  if (!username) {
    alert("ユーザーが存在しません。");
    router.replace("/");
    return null;
  }

  return (
    <>
      <ProfileComponent username={username} />
      <Timeline username={username} />
    </>
  );
};

const Profile: React.FC = () => {
  return (
    <>
      <Topbar />
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileContent />
      </Suspense>
    </>
  );
};

export default Profile;
