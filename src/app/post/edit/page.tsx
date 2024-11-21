"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import EditPost from "@/components/layouts/editPost/EditPost";
import Loading from "@/components/layouts/loading/Loading";
import Topbar from "@/components/layouts/header/Header";
import Error from "@/components/layouts/error/Error";
import { useAppSelector } from "@/hooks/useSelector";

const PostEditContent: React.FC = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const postId = searchParams.get("post-id");
  const router = useRouter();

  // クエリがない場合にリダイレクト
  useEffect(() => {
    if (!postId) {
      alert("投稿が存在しません。");
      router.replace("/");
    }
  }, [postId, router]);

  if (!user) {
    return <UserNotFound />;
  } else if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  }

  return <EditPost postId={postId || ""} />;
};

const PostEditPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <div className="max-w-xl mx-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <PostEditContent />
        </Suspense>
      </div>
    </div>
  );
};

export default PostEditPage;
