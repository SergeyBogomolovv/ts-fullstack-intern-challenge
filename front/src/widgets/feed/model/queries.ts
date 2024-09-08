import {
  Cat,
  CatImage,
  CatImageSchema,
  Favourite,
  FavouriteSchema,
} from "@/entities/cat";
import { checkAuth, getUser } from "@/entities/user";
import { $api, $cats } from "@/shared/config/axios";
import queryClient from "@/shared/config/query";

import { z } from "zod";

export const fetchFavorites = async ({ pageParam = 0 }): Promise<Cat[]> => {
  const user = getUser();
  try {
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
  } catch (error) {
    return [];
  }
};

export const fetchFeed = async ({ pageParam = 0 }): Promise<Cat[]> => {
  const { data } = await $cats.get<CatImage[]>(
    `/images/search?size=med&mime_types=jpg&format=json&order=RANDOM&page=${pageParam}&limit=15`,
  );

  const { success } = z.array(CatImageSchema).safeParse(data);

  if (success) {
    const isAuthenticated = checkAuth();
    const cats = data.map((cat) => ({
      cat_id: cat.id,
      image_url: cat.url,
      favorite: false,
    }));

    if (isAuthenticated) {
      const favorites = await getUserLikes();

      if (favorites?.length) {
        for (const catId of favorites) {
          const index = cats.findIndex((c) => c.cat_id === catId);
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

async function getUserLikes() {
  const data = queryClient.getQueryData<string[]>(["likes"]);
  if (data) {
    return data;
  }
  await queryClient.fetchQuery({
    queryKey: ["likes"],
    queryFn: () => $api.get<string[]>("/likes").then((res) => res.data),
  });

  return queryClient.getQueryData<string[]>(["likes"]);
}
