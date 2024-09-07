import { $cats } from "@/shared/config/axios";
import { Cat, Favourite } from "@/shared/types";
import getUser from "@/shared/utils/get-user";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFavorites = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["favorites"],
      queryFn: async ({ pageParam = 0 }): Promise<Cat[]> => {
        const user = getUser();
        const { data } = await $cats.get<Favourite[]>(
          `/favourites?sub_id=${user?.login}&size=med&mime_types=jpg&format=json&order=DESC&page=${pageParam}&limit=15`,
        );

        return data.map((cat) => ({
          cat_id: cat.image_id,
          image_url: cat.image.url,
          favorite: true,
        }));
      },

      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length > 0) {
          return pages.length;
        } else {
          return undefined;
        }
      },
    });

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return { cats: data?.pages.flat(), isFetchingNextPage, isLoading };
};
