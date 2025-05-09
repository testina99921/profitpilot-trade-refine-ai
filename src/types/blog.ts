
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  date: string;
  readingTime: string;
  coverImage: string;
  tags: string[];
}
