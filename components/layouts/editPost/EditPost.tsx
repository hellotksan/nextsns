"use client";

import React from "react";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import { useAppSelector } from "@/hooks/useSelector";
import usePost from "@/hooks/usePost";

interface EditPostProps {
  postId: string;
}

const EditPost: React.FC<EditPostProps> = ({ postId }) => {
  const { user } = useAppSelector((state) => state.auth);

  const { post, postDesc, setPostDesc, handleEdit, handleDelete } =
    usePost(postId);

  return (
    <>
      {!post ? (
        <LoadingSpinner />
      ) : (
        <div className="flex justify-center p-6 bg-white rounded-md max-w-2xl min-h-screen mx-auto">
          <div className="p-6 w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">投稿設定</h2>
            <div className="space-y-4">
              <div className="text-lg font-medium">投稿者ID: {post.userId}</div>
              <div className="text-lg font-medium">投稿番号: {post._id}</div>
              <div className="text-lg font-medium">
                投稿時間: {post.updatedAt.toLocaleString()}
              </div>
              <div className="text-lg font-medium">
                いいね数：{post.likes ? post.likes.length : "0"}
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
                <button
                  onClick={() => handleEdit(user?._id || "")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(user?._id || "")}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  投稿削除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { postId } = context.query;

  // postIdが無ければ404にする
  if (!postId) {
    return {
      notFound: true,
    };
  }
  return {
    props: { postId },
  };
};

export default EditPost;
