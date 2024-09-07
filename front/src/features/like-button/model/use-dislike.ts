import { $api } from "@/shared/config/axios";
import queryClient from "@/shared/config/query";
import { Cat } from "@/shared/schemas";
import { useMutation } from "@tanstack/react-query";

export const useDisLike = () => {
  return useMutation({
    mutationFn: (cat_id: string) => {
      return $api.delete(`/likes/${cat_id}`);
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
              cat.cat_id === cat_id ? { ...cat, favorite: false } : cat,
            ),
          );

          return {
            ...oldData,
            pages: newPages,
          };
        },
      );

      queryClient.setQueryData(
        ["favorites"],
        (oldData: { pages: Cat[][]; pageParams: number[] } | undefined) => {
          if (!oldData) {
            return oldData;
          }

          const newPages = oldData.pages.map((page) =>
            page.filter((cat) => cat.cat_id !== cat_id),
          );

          return {
            ...oldData,
            pages: newPages,
          };
        },
      );
    },
  });
};
