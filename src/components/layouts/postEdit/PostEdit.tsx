"use client";

import React from "react";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import usePost from "@/hooks/usePost";
import * as Feedback from "@/components/shared/feedback/index";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

interface PostEditProps {
  postId: string;
}

const PostEditComponent = ({ postId }: PostEditProps): JSX.Element | null => {
  const { user } = useAuth();

  const {
    post,
    postDesc,
    setPostDesc,
    handleEdit,
    handleDelete,
    isLoading,
    isError,
  } = usePost(postId);

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (isError) {
    return <Feedback.Error />;
  } else if (!post) {
    alert("投稿が見つかりませんでした。");
    return null;
  }

  return (
    <div className="flex justify-center p-3 max-w-xl min-h-screen mx-auto">
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">投稿設定</h2>
        <div className="space-y-2">
          <div className="text-lg font-medium">投稿者ID: {post.userId}</div>
          <div className="text-lg font-medium">投稿番号: {post._id}</div>
          <div className="text-lg font-medium">
            投稿時間: {post.updatedAt.toLocaleString()}
          </div>
          <div className="text-lg font-medium">
            いいね数：{post.likes ? post.likes.length : 0}
          </div>
          <div>
            <span className="text-lg font-medium">内容：</span>
            <textarea
              value={postDesc}
              onChange={(e) => setPostDesc(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows={3}
            />
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={() => handleEdit(user?._id || "")}
              variant="outline"
              className="hover:bg-gray-300"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(user?._id || "")}
              variant="outline"
              className="bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditComponent;
