import { $cats } from "@/shared/config/axios";
import { Favourite } from "@/shared/types";
import getUser from "@/shared/utils/get-user";
import { CatFeedContainer } from "@/widgets/feed";
import { useQuery } from "@tanstack/react-query";

export default function FavoritesPage() {
  const { data } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const user = getUser();
      const { data } = await $cats.get<Favourite[]>(
        `/favourites?sub_id=${user?.login}`,
      );
      const cats: any = data.map((favourite) => favourite.image);
      return cats;
    },
  });

  return <CatFeedContainer cats={data || []} />;
}
