import { useQuery } from "react-query";

import { allMemories } from "@/api-config/API";

export const useAllMemories = () => {
  const {
    data,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({ queryKey: ["memories"], queryFn: allMemories });

  return {
    data,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    refetch,
    isSuccess,
  };
};
