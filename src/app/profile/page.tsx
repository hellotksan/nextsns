"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import ProfileComponent from "@/components/layouts/profile/Profile";
import ProfileTimeline from "@/components/layouts/timeline/ProfileTimeline";
import Topbar from "@/components/layouts/header/Header";

const ProfileContent: React.FC = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const router = useRouter();

  if (!username) {
    alert("ユーザーが存在しません。");
    router.replace("/");
    return null;
  }

  return (
    <>
      <ProfileComponent username={username} />
      <ProfileTimeline username={username} />
    </>
  );
};

const ProfilePage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <div className="max-w-[480px] xl:w-[480px] mx-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <ProfileContent />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
