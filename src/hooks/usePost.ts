import useSWR from "swr";
import { useState, useEffect } from "react";
import axios from "axios";
import { POSTS_ENDPOINT } from "@/constants/api";
import { Post } from "@/types/post";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface UsePostResult {
  post: Post | null;
  postDesc: string;
  setPostDesc: (desc: string) => void;
  handleEdit: (userId: string) => Promise<void>;
  handleDelete: (userId: string) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

const usePost = (postId: string): UsePostResult => {
  const { data, error, mutate } = useSWR<Post>(
    `${POSTS_ENDPOINT}/${postId}`,
    fetcher
  );

  const [postDesc, setPostDesc] = useState<string>("");

  useEffect(() => {
    if (data) {
      setPostDesc(data.desc);
    }
  }, [data]);

  const handleEdit = async (userId: string) => {
    if (userId !== data?.userId) {
      alert("更新権限がありません。");
      return;
    }
    if (window.confirm("本当に更新してもよろしいですか？")) {
      try {
        await axios.put(`${POSTS_ENDPOINT}/${data._id}`, {
          userId,
          desc: postDesc,
        });
        alert("更新しました。");
        mutate();
      } catch (error) {
        alert("投稿の更新に失敗しました:");
      }
    }
  };

  const handleDelete = async (userId: string) => {
    if (userId !== data?.userId) {
      alert("削除権限がありません。");
      return;
    }
    if (window.confirm("本当に削除してもよろしいですか？")) {
      try {
        await axios.delete(`${POSTS_ENDPOINT}/${data._id}`, {
          data: { userId },
        });
        alert("正常に削除されました。");
        mutate(undefined, false);
      } catch (err) {
        alert("投稿の削除に失敗しました:");
      }
    }
  };

  return {
    post: data || null,
    postDesc,
    setPostDesc,
    handleEdit,
    handleDelete,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default usePost;
