import Sources from "./view/sources/sources";

export interface ResponseArticles {
  status: 'ok' | 'error';
  length: number;
  articles: Article[];
}

export interface Article {
  source: {
    id: string, // string | null
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

export interface ResponseSources {
  status: 'ok' | 'error';
  sources: Source[];
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
