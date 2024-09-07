import { useInfiniteQuery } from "@tanstack/react-query";
import { $cats } from "@/shared/config/axios";
import { Cat, CatImage } from "@/shared/types";
import { useEffect } from "react";

export const useFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: async ({ pageParam = 0 }): Promise<Cat[]> => {
        const { data } = await $cats.get<CatImage[]>(
          `/images/search?size=med&mime_types=jpg&format=json&order=RANDOM&page=${pageParam}&limit=15`,
        );
        return data.map((cat) => ({
          cat_id: cat.id,
          image_url: cat.url,
          favorite: false, //TODO: set it right
        }));
      },

      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length > 0) {
          return pages.length;
        } else {
          return undefined;
        }
      },
      initialPageParam: 0,
      staleTime: 1000 * 60 * 10,
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

  return {
    cats: data?.pages.flat(),
    isFetchingNextPage,
    isLoading,
  };
};