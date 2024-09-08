import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "./queries";

export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
  });
};
