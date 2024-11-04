import useSWR from "swr";
import axios from "axios";
import { USERS_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useUser = (username: string) => {
  const { data, error, isLoading } = useSWR<User>(
    `${USERS_ENDPOINT}?username=${username}`,
    fetcher
  );

  return {
    userData: data,
    isLoading,
    isError: !!error,
  };
};
