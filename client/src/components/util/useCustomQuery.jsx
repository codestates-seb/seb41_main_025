import { useQuery } from "@tanstack/react-query";


export const useCustomQuery = (url, queryKey) => {
  const { data, isLoading, error, status, refetch } = useQuery(
    [queryKey],
    () =>
      fetch(`http://whatu1.kro.kr:8080${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "AutHorization": localStorage.getItem("accessToken"),
        },
      }).then((res) => {
        return res.json();
      }),
    { keepPreviousData: false }
  );

  return { data, isLoading, error, status, refetch };
};
