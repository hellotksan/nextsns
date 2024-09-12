import React, { useContext, useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../state/AuthContext";
import Image from "next/image";
import Link from "next/link";
import "./index.css";

function Post({ post }) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const [like, setLike] = useState(post.likes.length);
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
    <div className="post">
      <div className="postWrapper">
        {/* 投稿したユーザーのプロフィールを表示 */}
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              href={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {user.profilePicture ? (
                <Image
                  src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
                  alt=""
                  className="postProfileImg"
                  width={32}
                  height={32}
                />
              ) : (
                <PersonIcon className="postProfileImg" />
              )}
              <span className="postUsername">{user.username}</span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <Link
              href={`/postEdit/${user.username}/${post._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MoreVert />
            </Link>
          </div>
        </div>

        {/* 投稿した内容を表示する */}
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          {post.img ? (
            <Image
              src={`${PUBLIC_FOLDER}/images/${post.img}`}
              alt=""
              className="postImg"
              width={50}
              height={50}
            />
          ) : (
            <></>
          )}
        </div>

        {/* 投稿記事のいいね数とコメント数を表示する */}
        <div className="postBottom">
          {/* いいね数の表示 */}
          <div className="postButtomLeft">
            <FavoriteIcon
              className="likeIcon"
              style={{ color: "red" }}
              onClick={() => {
                handleLike();
              }}
            />
            <span className="postLikeCounter">
              {like}人がいいねを押しました
            </span>
          </div>
          {/* コメント数の表示 */}
          {/* <div className="postButtomRight">
            <span className="postCommentText">{post.comment}コメント</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Post;
