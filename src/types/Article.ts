export interface Article {
  title: string;
  author: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
}