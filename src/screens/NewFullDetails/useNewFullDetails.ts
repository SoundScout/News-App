import { useState, useEffect } from 'react';
import { Article } from '../../types/Article';
import { fetchFullArticleContent } from '../../api/gnewsApi';

export function useNewFullDetailsScreen(article: Article) {
  const [fullContent, setFullContent] = useState<string>('');
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(false);

  const loadFullContent = async () => {
    setIsLoadingContent(true);
    try {
      const content = await fetchFullArticleContent(article.url);
      setFullContent(content);
    } catch (error) {
    } finally {
      setIsLoadingContent(false);
    }
  };

  useEffect(() => {
    if (!article.content || article.content.length < 200) {
      loadFullContent();
    } else {
      setFullContent(article.content);
    }
  }, [article.url, article.content]);

  return { 
    openArticle: article,
    fullContent,
    isLoadingContent,
    loadFullContent
  };
}