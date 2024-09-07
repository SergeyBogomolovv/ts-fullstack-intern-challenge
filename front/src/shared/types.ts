export type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type Like = {
  id: string;
  cat_id: string;
  created_at: string;
};

export type Favourite = {
  id: number;
  cat_id: string;
  image_id: string;
  sub_id: string;
  image: {
    id: string;
    url: string;
  };
  created_at: string;
};
