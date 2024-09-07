import { useInfiniteQuery } from "@tanstack/react-query";
import { $cats } from "@/shared/config/axios";
import { useEffect } from "react";
import {
  Cat,
  CatImage,
  CatImageSchema,
  Favourite,
  FavouriteSchema,
} from "@/shared/schemas";
import { z } from "zod";
import getUser from "@/shared/utils/get-user";

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
          const user = getUser();
          const cats = data.map((cat) => ({
            cat_id: cat.id,
            image_url: cat.url,
            favorite: false,
          }));

          if (user) {
            const { data: favorites } = await $cats.get<Favourite[]>(
              `/favourites?sub_id=${user?.login}&size=med&mime_types=jpg&format=json&order=DESC`,
            );
            const { success } = z.array(FavouriteSchema).safeParse(favorites);
            if (success) {
              for (const cat of favorites) {
                const index = cats.findIndex((c) => c.cat_id === cat.image_id);
                if (index !== -1) {
                  cats[index].favorite = true;
                }
              }
            }
          }

          return cats;
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
