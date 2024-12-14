import React, { Suspense, useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { format } from "timeago.js";
import Link from "next/link";
import axios from "axios";
import { USERS_ENDPOINT, POSTS_ENDPOINT } from "@/constants/api";
import { Post as PostType } from "@/types/post";
import { User } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RocketIcon from "@mui/icons-material/Rocket";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@/hooks/useAuth";

interface PostProps {
  post: PostType;
}

const SinglePost: React.FC<PostProps> = ({ post }) => {
  const { user: currentUser } = useAuth();
  const like = post.likes ? post.likes.length : 0;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(USERS_ENDPOINT, {
          params: { userId: post.userId },
        });
        setUser(response.data);
      } catch (err) {
        alert("エラーが発生しました。");
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
    } catch (err) {
      alert("エラーが発生しました。");
    }
  };

  return (
    <Suspense>
      <div className="w-full border-2 shadow-md rounded-lg my-4">
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
                {user?.profilePicture ? <RocketIcon /> : <PersonIcon />}
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
              {/* TODO:コメント数の表示 */}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SinglePost;
