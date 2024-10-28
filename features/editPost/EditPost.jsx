"use client";

import { AuthContext } from "@/state/AuthContext";
import React, { useContext } from "react";
import usePost from "@/hooks/usePost";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";

const EditPost = ({ postId }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useContext(AuthContext);

  const { post, postDesc, setPostDesc, handleEdit, handleDelete } = usePost(
    postId,
    apiUrl
  );

  if (post === null) {
    return <div>投稿が見つかりません。</div>; // エラーメッセージの表示
  }
  if (!post)
    return (
      <>
        <LoadingSpinner />
      </>
    );

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="profileRightTop p-6 bg-white shadow-md rounded-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">投稿設定</h2>
        <div className="space-y-4">
          <div className="text-lg font-medium">投稿者ID: {post.userId}</div>
          <div className="text-lg font-medium">投稿番号: {post._id}</div>
          <div className="text-lg font-medium">投稿時間: {post.updatedAt}</div>
          <div className="text-lg font-medium">
            いいね数：{post.likes ? post.likes.length : "0"}
          </div>
          <div>
            <span className="text-lg font-medium">内容：</span>
            <input
              type="text"
              value={postDesc}
              onChange={(e) => setPostDesc(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
  );
};

export const getServerSideProps = async (context) => {
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
