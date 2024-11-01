import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { POSTS_ENDPOINT } from "@/constants/api";
import { Post } from "@/types/post";

// カスタムフックの戻り値の型定義
interface UsePostResult {
  post: Post | null;
  postDesc: string;
  setPostDesc: (desc: string) => void;
  fetchPost: () => Promise<void>;
  handleEdit: (userId: string) => Promise<void>;
  handleDelete: (userId: string) => Promise<void>;
}

const usePost = (postId: string): UsePostResult => {
  const [post, setPost] = useState<Post | null>(null);
  const [postDesc, setPostDesc] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await axios.get<Post>(`${POSTS_ENDPOINT}/${postId}`);
      setPost(response.data);
      setPostDesc(response.data.desc);
    } catch (error) {
      alert("投稿の取得に失敗しました:");
    }
  };

  const handleEdit = async (userId: string) => {
    if (userId !== post?.userId) {
      alert("更新権限がありません。");
      return;
    }
    if (window.confirm("本当に更新してもよろしいですか？")) {
      try {
        await axios.put(`${POSTS_ENDPOINT}/${post._id}`, {
          userId,
          desc: postDesc,
        });
        alert("更新しました。");
        router.refresh();
      } catch (error) {
        alert("投稿の更新に失敗しました:");
      }
    }
  };

  const handleDelete = async (userId: string) => {
    if (userId !== post?.userId) {
      alert("削除権限がありません。");
      return;
    }
    if (window.confirm("本当に削除してもよろしいですか？")) {
      try {
        await axios.delete(`${POSTS_ENDPOINT}/${post._id}`, {
          data: { userId },
        });
        alert("投稿が削除されました。");
        router.refresh();
      } catch (error) {
        alert("投稿の削除に失敗しました:");
      }
    }
  };

  return { post, postDesc, setPostDesc, fetchPost, handleEdit, handleDelete };
};

export default usePost;
