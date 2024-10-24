"use client";

import React, { useRef, useContext } from "react";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { AuthContext } from "@/state/AuthContext";

const PostForm = ({ onPostSuccess }) => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!desc.current.value.trim()) {
      alert("投稿内容を入力してください。");
      return;
    }

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    try {
      await axios.post(`${PUBLIC_FOLDER}/api/posts/`, newPost);
      onPostSuccess({ ...newPost, _id: Date.now() }); // 新しい投稿を親コンポーネントに通知
      desc.current.value = "";
    } catch (error) {
      alert("エラーが発生しました。");
    }
  };

  return (
    <div className="sticky top-10 bg-white h-[170px] shadow-lg rounded-lg py-5 z-10">
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
          />
        </div>
        <hr className="my-5" />
        <form
          className="flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <button
            className="bg-blue-800 text-white py-1 px-4 rounded-md hover:bg-blue-900 transition"
            type="submit"
          >
            投稿
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
