import { useEffect, useState } from "react";
import axios from "axios";
import { USERS_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";

const useFollowers = (followingIds: string[] | null) => {
  const [followingFriends, setFollowingFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowingFriends = async () => {
      setLoading(true);
      setError(null);

      if (followingIds && followingIds.length > 0) {
        try {
          const friendsPromises = followingIds.map((id) =>
            axios.get(`${USERS_ENDPOINT}/${id}`)
          );
          const friendsResponses = await Promise.all(friendsPromises);
          const friendsData = friendsResponses.map((response) => response.data);
          setFollowingFriends(friendsData);
        } catch (err) {
          setError("フォロワーの取得に失敗しました。");
        } finally {
          setLoading(false);
        }
      } else {
        // 空の配列の場合はローディングをfalseに
        setLoading(false);
      }
    };

    fetchFollowingFriends();
  }, [followingIds]);

  return { followingFriends, loading, error };
};

export default useFollowers;
