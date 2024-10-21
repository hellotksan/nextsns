import { useState, useEffect } from "react";
import axios from "axios";

// 投稿データの型定義
interface Post {
  _id: string;
  userId: string;
  desc: string;
  updatedAt: string;
  likes?: string[];
}

// カスタムフックの戻り値の型定義
interface UsePostResult {
  post: Post | null;
  postDesc: string;
  setPostDesc: (desc: string) => void;
  fetchPost: () => Promise<void>;
  handleEdit: (userId: string) => Promise<void>;
  handleDelete: (userId: string) => Promise<void>;
}

const usePost = (
  postId: string,
  username: string,
  apiUrl: string
): UsePostResult => {
  const [post, setPost] = useState<Post | null>(null);
  const [postDesc, setPostDesc] = useState<string>("");

  useEffect(() => {
    fetchPost();
  }, [postId, apiUrl]);

  const fetchPost = async () => {
    try {
      const response = await axios.get<Post>(`${apiUrl}/api/posts/${postId}`);
      setPost(response.data);
      setPostDesc(response.data.desc);
    } catch (error) {
      console.error("投稿の取得に失敗しました:", error);
    }
  };

  const handleEdit = async (userId: string) => {
    if (username !== post?.userId) {
      alert("更新権限がありません。");
      return;
    }
    if (window.confirm("本当に更新してもよろしいですか？")) {
      try {
        await axios.put(`${apiUrl}/api/posts/${post._id}`, {
          userId,
          desc: postDesc,
        });
        alert("更新しました。");
      } catch (error) {
        console.error("投稿の更新に失敗しました:", error);
      }
    }
  };

  const handleDelete = async (userId: string) => {
    if (username !== post?.userId) {
      alert("削除権限がありません。");
      return;
    }
    if (window.confirm("本当に削除してもよろしいですか？")) {
      try {
        await axios.delete(`${apiUrl}/api/posts/${post._id}`, {
          data: { userId },
        });
        alert("投稿が削除されました。");
      } catch (error) {
        console.error("投稿の削除に失敗しました:", error);
      }
    }
  };

  return { post, postDesc, setPostDesc, fetchPost, handleEdit, handleDelete };
};

export default usePost;
