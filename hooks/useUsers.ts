import { useState, useEffect } from "react";
import axios from "axios";
import { ALL_USERS_ENDPOINT } from "@/constants/api";

interface User {
  _id: string;
  username: string;
  profilePicture?: string;
}

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: Error | null;
}

const useUsers = (): UseUsersResult => {
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

export default useUsers;
