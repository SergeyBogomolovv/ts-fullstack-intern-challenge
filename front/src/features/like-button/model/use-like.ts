import $api from "@/shared/config/axios";
import { useMutation } from "@tanstack/react-query";

export const useLike = () => {
  const { mutate, error } = useMutation({
    mutationFn: async (cat_id: string) => {
      const { data } = await $api.post("/likes", { cat_id });
      return data;
    },
  });

  return { like: mutate, error };
};
