import { useEffect, useState } from "react";
import axios from "axios";
import { USERS_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";

const useFollowingFriends = (followingIds: string[] | null) => {
  const [followingFriends, setFollowingFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowingFriends = async () => {
      if (followingIds && followingIds.length > 0) {
        setLoading(true);
        try {
          const friendsPromises = followingIds.map((id) =>
            axios.get(`${USERS_ENDPOINT}/${id}`)
          );
          const friendsResponses = await Promise.all(friendsPromises);
          const friendsData = friendsResponses.map((response) => response.data);
          setFollowingFriends(friendsData);
        } catch (err) {
          setError("フォロー中のユーザーを取得できませんでした。");
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // 空の配列の場合はローディングをfalseに
      }
    };

    fetchFollowingFriends();
  }, [followingIds]);

  return { followingFriends, loading, error };
};

export default useFollowingFriends;
