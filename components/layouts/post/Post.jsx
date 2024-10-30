import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
// import { MoreVert } from "@mui/icons-material";
import { format } from "timeago.js";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { USERS_ENDPOINT, POSTS_ENDPOINT } from "@/constants/api";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import { useAppSelector } from "@/hooks/useSelector";

function Post({ post }) {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [like, setLike] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(USERS_ENDPOINT, {
          params: { userId: post.userId },
        });
        setUser(response.data);
      } catch (error) {
        alert("エラーが発生しました。");
      } finally {
        // ローディング終了
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [post.userId]);

  // いいねボタンの処理
  const handleLike = async () => {
    try {
      await axios.put(`${POSTS_ENDPOINT}/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      alert("エラーが発生しました。");
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // ローディング中の表示
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full shadow-md rounded-lg mt-2">
      <div className="p-2">
        {/* 投稿したユーザーのプロフィールを表示 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Link
              href={{
                pathname: "/profile",
                query: user?.username ? { username: user.username } : {},
              }}
              className="no-underline text-black flex items-center"
            >
              {user.profilePicture ? (
                <Image
                  src={`/assets/person/${user.profilePicture}`}
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
          {/* <MoreVert /> */}
        </div>

        {/* 投稿した内容を表示する */}
        <div className="my-5">
          <Link
            href={{
              pathname: "/post-edit",
              query: post?._id ? { "post-id": post._id } : {},
            }}
            className="no-underline text-black"
          >
            <span className="block text-base">{post.desc}</span>
            {/* {post.img && (
              <Image
                src={`/assets/person/${user.profilePicture}`}
                alt="post-image"
                className="mt-5 w-full max-h-500 object-contain"
                width={50}
                height={50}
              />
            )} */}
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
        </div>
      </div>
    </div>
  );
}

export default Post;
