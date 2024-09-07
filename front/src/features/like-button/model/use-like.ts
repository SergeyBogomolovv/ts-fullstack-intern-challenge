import { $api } from "@/shared/config/axios";
import queryClient from "@/shared/config/query";
import { useMutation } from "@tanstack/react-query";

export const useLike = () => {
  return useMutation({
    mutationFn: (cat_id: string) => {
      return $api.post("/likes", { cat_id });
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["favorites", "feed"] });
    },
  });
};
