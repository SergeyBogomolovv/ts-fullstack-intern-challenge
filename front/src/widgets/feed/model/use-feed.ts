import { useInfiniteQuery } from "@tanstack/react-query";
import { $cats } from "@/shared/config/axios";
import { Cat } from "@/shared/types";
import { useEffect } from "react";

export const useFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: async ({ pageParam = 0 }) => {
        const { data } = await $cats.get<Cat[]>(
          `/images/search?size=low&mime_types=jpg&format=json&order=RANDOM&page=${pageParam}&limit=20`,
        );
        return data;
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

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    data,
    isFetchingNextPage,
    isLoading,
  };
};
