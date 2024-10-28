"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useContext, useEffect } from "react";
import { AuthContext } from "@/state/AuthContext";
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Timeline from "@/components/layouts/timeline/Timeline";
import Loading from "@/components/layouts/loading/Loading";
import Topbar from "@/components/layouts/header/Header";
import Error from "@/components/layouts/error/Error";
import ShowProfile from "@/features/profile/Profile";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";

// クエリ取得と認証のチェックを行うコンポーネント
function ProfileContent() {
  const { user, isFetching, error } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const router = useRouter();

  // クエリがない場合にリダイレクト
  useEffect(() => {
    if (!username) {
      alert("ユーザーが存在しません。");
      router.replace("/");
    }
  }, [username, router]);

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
      <ShowProfile username={username} />
      <Timeline username={username} />
    </>
  );
}

// Suspenseを使用してProfileContentをラップする
function Profile() {
  return (
    <>
      <Topbar />
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileContent />
      </Suspense>
    </>
  );
}

export default Profile;
