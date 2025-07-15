import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchArticlesFromApi } from '../../api/gnewsApi';
import { Article } from '../../types/Article';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export function useSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const articles = await fetchArticlesFromApi({ query: query.trim(), max: 10 });
      setSearchResults(articles);
    } catch (error) {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    performSearch(searchQuery);
  }, [searchQuery, performSearch]);

  const handleArticlePress = useCallback((article: Article) => {
    navigation.navigate('Details', { article });
  }, [navigation]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  return { 
    searchQuery, 
    setSearchQuery: handleSearch,
    searchResults,
    isSearching,
    handleSearchSubmit,
    handleArticlePress,
    clearSearch
  };
}