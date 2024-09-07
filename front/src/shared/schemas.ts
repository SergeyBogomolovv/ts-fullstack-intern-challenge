import { z } from "zod";

export const CatImageSchema = z.object({
  breeds: z.optional(z.array(z.any())),
  categories: z.optional(z.array(z.any())),
  height: z.number(),
  id: z.string(),
  url: z.string(),
  width: z.number(),
});

export type CatImage = z.infer<typeof CatImageSchema>;

export const FavouriteSchema = z.object({
  created_at: z.string(),
  id: z.number(),
  image: z.object({
    id: z.string(),
    url: z.string(),
  }),
  image_id: z.string(),
  sub_id: z.string(),
  user_id: z.string(),
});

export type Favourite = z.infer<typeof FavouriteSchema>;

export const CatSchema = z.object({
  cat_id: z.string(),
  favorite: z.boolean(),
  image_url: z.string(),
});

export type Cat = z.infer<typeof CatSchema>;

export const UserSchema = z.object({
  login: z.string(),
  id: z.string(),
});

export type User = z.infer<typeof UserSchema>;
