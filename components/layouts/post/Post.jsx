import React, { useContext, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
// import { MoreVert } from "@mui/icons-material";
import { AuthContext } from "@/state/AuthContext";
import { format } from "timeago.js";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

function Post({ post }) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const [like, setLike] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?userId=${post.userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [post.userId, PUBLIC_FOLDER]);

  // いいねボタンの処理
  const handleLike = async () => {
    try {
      await axios.put(`${PUBLIC_FOLDER}/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full shadow-md rounded-lg mt-2">
      <div className="p-2">
        {/* 投稿したユーザーのプロフィールを表示 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Link
              href={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
              className="no-underline text-black flex items-center"
            >
              {user.profilePicture ? (
                <Image
                  src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
                  alt="user-profile-picture"
                  className="w-8 h-8 rounded-full object-cover"
                  width={32}
                  height={32}
                />
              ) : (
                <PersonIcon className="w-8 h-8 rounded-full" />
              )}
              <span className="ml-2 text-sm font-semibold">
                {user.username}
              </span>
            </Link>
            <span className="text-xs ml-2">{format(post.createdAt)}</span>
          </div>
          {/* <div className="">
            <MoreVert />
          </div> */}
        </div>

        {/* 投稿した内容を表示する */}
        <div className="my-5">
          <Link
            href={`/postEdit/${user.username}/${post._id}`}
            style={{ textDecoration: "none", color: "black" }}
            className="no-underline text-black"
          >
            <span className="block text-base">{post.desc}</span>
            {post.img && (
              <Image
                src={`${PUBLIC_FOLDER}/images/${post.img}`}
                alt="post-image"
                className="mt-5 w-full max-h-500 object-contain"
                width={50}
                height={50}
              />
            )}
          </Link>
        </div>

        {/* 投稿記事のいいね数とコメント数を表示する */}
        <div className="flex items-center justify-between">
          {/* いいね数の表示 */}
          <div className="flex items-center">
            <FavoriteIcon
              className="text-red-500 cursor-pointer w-6 h-6 mr-1"
              style={{ color: "red" }}
              onClick={() => {
                handleLike();
              }}
            />
            <span className="text-base">{like}</span>
          </div>
          {/* コメント数の表示 */}
          {/* <div className="">
            <span className="">{post.comment}コメント</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Post;
