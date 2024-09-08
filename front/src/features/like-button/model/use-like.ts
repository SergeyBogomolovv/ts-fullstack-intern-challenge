import { Cat } from "@/entities/cat";
import { $api } from "@/shared/config/axios";
import queryClient from "@/shared/config/query";
import { useMutation } from "@tanstack/react-query";

export const useLike = () => {
  return useMutation({
    mutationFn: (cat_id: string) => {
      return $api.post("/likes", { cat_id });
    },
    onMutate(cat_id) {
      queryClient.setQueryData(
        ["feed"],
        (oldData: { pages: Cat[][]; pageParams: number[] } | undefined) => {
          if (!oldData) {
            return oldData;
          }

          const newPages = oldData.pages.map((page) =>
            page.map((cat) =>
              cat.cat_id === cat_id ? { ...cat, favorite: true } : cat,
            ),
          );

          return {
            ...oldData,
            pages: newPages,
          };
        },
      );
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["favorites", "likes"] });
    },
  });
};
