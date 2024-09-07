export type CatImage = {
  breeds: any[];
  categories: any[];
  height: number;
  id: string;
  url: string;
  width: number;
};

export type Cat = {
  cat_id: string;
  image_url: string;
  favorite?: boolean;
};

export type Favourite = {
  created_at: string;
  id: number;
  image: {
    id: string;
    url: string;
  };
  image_id: string;
  sub_id: string;
  user_id: string;
};
