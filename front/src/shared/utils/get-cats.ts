import axios from "axios";
import { CATS_API_KEY } from "../constants";
import { Cat } from "../types";

export default async function getCats(): Promise<Cat[]> {
  try {
    const { data } = await axios.get(
      "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&order=RANDOM&page=0&limit=10",
      { headers: { "x-api-key": CATS_API_KEY, redirect: "follow" } },
    );
    return data;
  } catch (error) {
    return [];
  }
}
