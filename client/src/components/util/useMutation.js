import { useMutation, useQueryClient } from "react-query";

export const useCustomMutation = (url, queryKey, method) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (suggest) => {
      return fetch(`http://whatu1.kro.kr:8080${url}`, {
        body: JSON.stringify(suggest),
        headers: { "Content-Type": "application/json" },
        method: method,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  );

  return { mutate };
};
