import { $cats } from "@/shared/config/axios";
import queryClient from "@/shared/config/query";
import {
  Cat,
  CatImage,
  CatImageSchema,
  Favourite,
  FavouriteSchema,
} from "@/shared/schemas";
import getUser from "@/shared/utils/get-user";
import { z } from "zod";

export const fetchFavorites = async ({ pageParam = 0 }): Promise<Cat[]> => {
  const user = getUser();
  const { data } = await $cats.get<Favourite[]>(
    `/favourites?sub_id=${user?.login}&size=med&mime_types=jpg&format=json&order=DESC&page=${pageParam}&limit=15`,
  );

  const { success } = z.array(FavouriteSchema).safeParse(data);

  if (success) {
    return data.map((cat) => ({
      cat_id: cat.image_id,
      image_url: cat.image.url,
      favorite: true,
    }));
  }
  return [];
};

export const fetchFeed = async ({ pageParam = 0 }): Promise<Cat[]> => {
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
      const favoritesData = queryClient.getQueryData<{
        pages: Cat[][];
        pageParams: number[];
      }>(["favorites"]);

      if (favoritesData?.pages?.length) {
        const favorites = favoritesData.pages.flat();

        for (const cat of favorites) {
          const index = cats.findIndex((c) => c.cat_id === cat.cat_id);
          if (index !== -1) {
            cats[index].favorite = true;
          }
        }
      }
    }

    return cats;
  }

  return [];
};
