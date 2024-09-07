import { useInfiniteQuery } from "@tanstack/react-query";
import { $cats } from "@/shared/config/axios";
import { useEffect } from "react";
import { Cat, CatImage, CatImageSchema } from "@/shared/schemas";
import { z } from "zod";

export const useFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: async ({ pageParam = 0 }): Promise<Cat[]> => {
        const { data } = await $cats.get<CatImage[]>(
          `/images/search?size=med&mime_types=jpg&format=json&order=RANDOM&page=${pageParam}&limit=15`,
        );
        const { success } = z.array(CatImageSchema).safeParse(data);

        if (success) {
          return data.map((cat) => ({
            cat_id: cat.id,
            image_url: cat.url,
            favorite: false, //TODO: set it right
          }));
        }
        return [];
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
