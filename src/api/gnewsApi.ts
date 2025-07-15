import axios from 'axios';
import { Article } from '../types/Article';

const API_KEY: string = 'e934f4fd24f12a6cc31ba87204d956b5';
const BASE_URL: string = 'https://gnews.io/api/v4';

export async function fetchArticlesFromApi(params?: { query?: string; max?: number; topic?: string }): Promise<Article[]> {
  try {
    const { query, topic } = params || {};
    const max = params?.max ?? 10;

    let url = '';
    if (query) {
      url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&token=${API_KEY}&lang=en&max=${max}`;
    } else {
      url = `${BASE_URL}/top-headlines?token=${API_KEY}&lang=en&max=${max}`;
      if (topic) {
        url += `&topic=${encodeURIComponent(topic)}`;
      }
    }
    
    const response = await axios.get(url);
    
    return response.data.articles as Article[];
  } catch (error) {
    return [];
  }
}

export async function fetchFullArticleContent(articleUrl: string): Promise<string> {
  try {
    const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(articleUrl)}`);
    
    if (response.data && response.data.contents) {
      const htmlContent = response.data.contents;
      const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      return textContent.substring(0, 2000);
    }
    
    return '';
  } catch (error) {
    return '';
  }
}