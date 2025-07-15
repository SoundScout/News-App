import { create } from 'zustand';
import { Article } from '../types/Article';
import { fetchArticlesFromApi } from '../api/gnewsApi';

type ArticleStore = {
  articles: Article[];
  loading: boolean;
  error: string | null;
  fetchArticles: (params?: { query?: string; topic?: string; max?: number }) => Promise<void>;
};

export const useArticleStore = create<ArticleStore>((set) => ({
  articles: [],
  loading: false,
  error: null,

  fetchArticles: async (params) => {
    set({ loading: true, error: null });

    try {
      const articles = await fetchArticlesFromApi(params);
      set({ articles, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));