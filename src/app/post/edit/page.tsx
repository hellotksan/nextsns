"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import * as Feedback from "@/components/shared/feedback/index";
import PostEditComponent from "@/components/layouts/postEdit/PostEdit";
import Topbar from "@/components/layouts/header/Header";
import { useAppSelector } from "@/hooks/useSelector";

const PostEditContent: React.FC = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const postId = searchParams.get("post-id");
  const router = useRouter();

  if (!postId) {
    alert("投稿が存在しません。");
    router.replace("/");
  }

  if (!user) {
    return <Feedback.UserNotFound />;
  } else if (isLoading) {
    return <Feedback.Loading />;
  } else if (error) {
    return <Feedback.Error />;
  }

  return <PostEditComponent postId={postId || ""} />;
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
