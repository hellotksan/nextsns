"use client";

import { AuthContext } from "@/state/AuthContext";
import React, { Suspense, useContext, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import EditPost from "@/components/layouts/editPost/EditPost";
import Loading from "@/components/layouts/loading/Loading";
import Topbar from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import Error from "@/components/layouts/error/Error";

function PostEditContent() {
  const { user, isFetching, error } = useContext(AuthContext);
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
  }
  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return <EditPost postId={postId} />;
}

function PostEdit() {
  return (
    <>
      <Topbar />
      <Suspense fallback={<LoadingSpinner />}>
        <PostEditContent />
      </Suspense>
      <Footer />
    </>
  );
}

export default PostEdit;
