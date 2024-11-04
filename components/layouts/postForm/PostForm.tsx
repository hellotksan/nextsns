"use client";

import React, { useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { POSTS_ENDPOINT } from "@/constants/api";
import { useAppSelector } from "@/hooks/useSelector";
import PersonIcon from "@mui/icons-material/Person";
import { User } from "@/types/user";
import { Post } from "@/types/post";
import PostButton from "@/components/elements/PostButton";

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

  return (
    <div className="top-5 h-auto shadow-lg rounded-lg py-5 z-50">
      <div className="p-2">
        <div className="flex items-center">
          {user.profilePicture ? (
            <Image
              src={`/assets/person/${user.profilePicture}`}
              alt="profile-picture"
              className="w-12 h-12 rounded-full object-cover mr-2"
              width={50}
              height={50}
            />
          ) : (
            <PersonIcon className="w-12 h-12 mr-2" />
          )}
          <textarea
            className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-vertical"
            placeholder="今何してるの？"
            ref={desc}
            rows={3}
          />
        </div>
        <hr className="my-2" />
        <form
          className="flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <PostButton />
        </form>
      </div>
    </div>
  );
};

export default PostForm;
