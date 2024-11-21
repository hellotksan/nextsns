"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

const ProfilePage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <div className="max-w-xl mx-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <ProfileContent />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
