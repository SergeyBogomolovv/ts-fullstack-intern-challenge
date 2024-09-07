import { $api } from "@/shared/config/axios";
import queryClient from "@/shared/config/query";
import { useMutation } from "@tanstack/react-query";

export const useDisLike = () => {
  return useMutation({
    mutationFn: (cat_id: string) => {
      return $api.delete(`/likes/${cat_id}`);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorites", "feed"] });
    },
  });
};
