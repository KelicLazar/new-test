export type PostItem = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
};
export type PostsResponse = {
  posts: PostItem[];
  limit: number;
  skip: number;
  total: number;
};
