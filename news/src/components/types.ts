export interface IResponse {
  status: 'ok' | 'error';
  length: number;
  articles: IArticle[];
}

export interface IArticle {
  source: {
    id: string | null,
    name: string,
  },
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
