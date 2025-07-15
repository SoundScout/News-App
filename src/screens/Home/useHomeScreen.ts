import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useArticleStore } from '../../store/useArticleStore';
import { usePreferenceStore } from '../../store/usePreferenceStore';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Article } from '../../types/Article';

const ARTICLE_COUNT_OPTIONS = [5, 10];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export function useHomeScreen() {
  const articles = useArticleStore((state) => state.articles);
  const fetchArticles = useArticleStore((state) => state.fetchArticles);
  const loading = useArticleStore((state) => state.loading);
  const preferences = usePreferenceStore((state) => state.preferences);
  const [selectedArticleCount, setSelectedArticleCount] = useState<number>(10);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();

  const loadArticlesByPreferences = () => {
    const topic = preferences.topics && preferences.topics.length > 0 ? preferences.topics[0] : 'general';
    fetchArticles({ topic, max: selectedArticleCount });
  };

  const updateArticleCount = (count: number) => {
    setSelectedArticleCount(count);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleArticlePress = (article: Article) => {
    navigation.navigate('Details', { article });
  };

  const handleArticleCountSelect = (count: number) => {
    updateArticleCount(count);
  };

  const refetchWithNewCount = () => {
    loadArticlesByPreferences();
  };

  useEffect(() => {
    loadArticlesByPreferences();
  }, [fetchArticles, preferences, selectedArticleCount]);

  return { 
    articles,
    loading,
    selectedArticleCount,
    articleCountOptions: ARTICLE_COUNT_OPTIONS,
    isFilterVisible,
    loadArticlesByPreferences,
    updateArticleCount,
    toggleFilterVisibility,
    handleArticlePress,
    handleArticleCountSelect,
    refetchWithNewCount
  };
}