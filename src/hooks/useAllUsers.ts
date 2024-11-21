import { useState, useEffect } from "react";
import axios from "axios";
import { ALL_USERS_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: Error | null;
}

const useAllUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(ALL_USERS_ENDPOINT);
        setUsers(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useAllUsers;
