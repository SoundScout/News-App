import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSearchScreen } from './useSearchScreen';
import SearchBar from '../../components/SearchBar';
import ArticleCard from '../../components/ArticleCard';

export default function SearchScreen() {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults,
    isSearching, 
    handleSearchSubmit,
    handleArticlePress
  } = useSearchScreen();

  const renderHeader = () => (
    <View style={styles.header}>
      <Ionicons name="search-outline" size={24} color="#007AFF" />
      <Text style={styles.headerTitle}>Search Articles</Text>
    </View>
  );

  const renderEmptyState = () => {
    if (searchQuery.trim() && !isSearching) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No Results Found</Text>
          <Text style={styles.emptySubtitle}>
            Try different keywords or check your spelling
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={64} color="#ccc" />
        <Text style={styles.emptyTitle}>Search Articles</Text>
        <Text style={styles.emptySubtitle}>
          Enter keywords to find articles about topics you're interested in
        </Text>
      </View>
    );
  };

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>
        Searching...
      </Text>
    </View>
  );

  const renderSearchResults = () => (
    <View style={styles.resultsHeader}>
      <Text style={styles.resultsCount}>
        {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
      </Text>
      <Text style={styles.apiLimitNote}>
        Showing top 10 results (API limit)
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearchSubmit}
        placeholder="Search for articles, topics, or keywords..."
      />

      {isSearching ? (
        renderLoadingState()
      ) : searchResults.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          {renderSearchResults()}
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <ArticleCard article={item} onPress={() => handleArticlePress(item)} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  resultsHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  apiLimitNote: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
});