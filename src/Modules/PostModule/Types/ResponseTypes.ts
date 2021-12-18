export type POST = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: {
    id: number;
    name: string;
    email: string;
  };
};

export type POSTS_RESPONSE = {
  data: Array<POST>;
};

export type POST_RESPONSE = {
  data: POST;
};

export type MUTATE_POST_RESPONSE = {
  data: POST;
  message: string;
};

export type POST_DELETE_RESPONSE = {
  message: string;
};
