import { CATS_API_KEY } from "@/shared/constants";
import { Cat } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFeed = () => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: () =>
      axios.get<Cat[]>(
        "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&order=RANDOM&page=0&limit=10",
        { headers: { "x-api-key": CATS_API_KEY } },
      ),
  });
};
