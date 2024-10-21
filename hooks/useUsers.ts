import { useState, useEffect } from "react";
import axios from "axios";

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

const useUsers = (apiUrl: string): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${apiUrl}/api/users/all`);
        setUsers(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  return { users, loading, error };
};

export default useUsers;
