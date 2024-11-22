import React, { useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { format } from "timeago.js";
import Link from "next/link";
import axios from "axios";
import { USERS_ENDPOINT, POSTS_ENDPOINT } from "@/constants/api";
import { useAppSelector } from "@/hooks/useSelector";
import { Post as PostType } from "@/types/post";
import { User } from "@/types/user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

interface PostProps {
  post: PostType;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [like, setLike] = useState<number>(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<User>(USERS_ENDPOINT, {
          params: { userId: post.userId },
        });
        setUser(response.data);
      } catch (error) {
        alert("エラーが発生しました。");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [post.userId]);

  // いいねボタンの処理
  const handleLike = async () => {
    if (!currentUser) {
      alert("いいねするにはログインしてください。");
      return;
    }

    try {
      await axios.put(`${POSTS_ENDPOINT}/${post._id}/like`, {
        userId: currentUser?._id,
      });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      alert("エラーが発生しました。");
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full border-2 shadow-md rounded-lg my-3">
          <div className="p-2">
            {/* 投稿したユーザーのプロフィールを表示 */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Link
                  href={{
                    pathname: "/profile",
                    query: user?.username ? { username: user.username } : {},
                  }}
                  className="flex items-center"
                >
                  {user?.profilePicture ? (
                    <RocketLaunchIcon
                      fontSize="medium"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <PersonIcon
                      fontSize="medium"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="ml-2 text-sm font-semibold">
                    {user?.username}
                  </span>
                </Link>
                <span className="text-xs ml-2">{format(post.createdAt)}</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger aria-label="edit-post-icon">
                  <MoreVert />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {currentUser ? (
                    <>
                      <Link
                        href={{
                          pathname: "/post/edit",
                          query: post?._id ? { "post-id": post._id } : {},
                        }}
                        className="no-underline"
                      >
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </Link>
                    </>
                  ) : null}
                  <DropdownMenuItem>Block</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* 投稿した内容を表示する */}
            <div className="my-5">
              <span className="block text-base mx-1">{post.desc}</span>
              {/* TODO: 投稿記事の画像 */}
            </div>

            {/* 投稿記事のいいね数とコメント数を表示する */}
            <div className="flex items-center justify-between">
              {/* いいね数の表示 */}
              <div className="flex items-center">
                <FavoriteIcon
                  className="text-red-500 cursor-pointer w-6 h-6 mr-1"
                  onClick={() => {
                    handleLike();
                  }}
                />
                <span className="text-base">{like}</span>
              </div>
              {/* TODO:コメント数の表示 */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostComponent;
