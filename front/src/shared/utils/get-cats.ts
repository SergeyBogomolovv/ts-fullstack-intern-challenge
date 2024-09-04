import { CATS_API_KEY } from "../constants";
import { Cat } from "../types";

const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": CATS_API_KEY,
});

export default async function getCats(): Promise<Cat[]> {
  try {
    const res = await fetch(
      "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&order=RANDOM&page=0&limit=10",
      { method: "GET", headers, redirect: "follow" },
    );
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
