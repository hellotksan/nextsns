"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { POSTS_ENDPOINT } from "@/constants/api";
import { useAppSelector } from "@/hooks/useSelector";
import PersonIcon from "@mui/icons-material/Person";
import { User } from "@/types/user";
import { Post } from "@/types/post";
import PostButton from "./PostButton";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

interface PostFormProps {
  onPostSuccess: (newPost: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSuccess }) => {
  const { user } = useAppSelector((state) => state.auth) as { user: User };
  const desc = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!desc.current?.value.trim()) {
      alert("投稿内容を入力してください。");
      return;
    }

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    try {
      const response = await axios.post(POSTS_ENDPOINT, newPost);
      const { _id, createdAt, updatedAt } = response.data;
      // 新しい投稿を親コンポーネントに通知
      onPostSuccess({ ...newPost, _id, createdAt, updatedAt });
      if (desc.current) {
        desc.current.value = ""; // テキストエリアをクリア
      }
    } catch (error) {
      alert("エラーが発生しました。");
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // クライアントサイドでのレンダリングを有効化
  }, []);

  if (!isClient) return null; // クライアントサイドでない場合、何も表示しない

  return (
    <div className="top-10 h-auto border-2 shadow-md rounded-lg p-2 mt-3">
      <div className="flex items-center py-1">
        {user.profilePicture ? (
          <RocketLaunchIcon
            fontSize="large"
            className="w-8 h-8 mx-2 no-underline"
          />
        ) : (
          <PersonIcon className="w-12 h-12 mx-2" />
        )}
        <textarea
          className="w-full mx-2 px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-vertical"
          placeholder="What's Happend??"
          ref={desc}
          rows={3}
        />
      </div>
      <hr className="my-2" />
      <form
        className="flex items-center justify-between my-1"
        onSubmit={handleSubmit}
      >
        <PostButton />
      </form>
    </div>
  );
};

export default PostForm;
