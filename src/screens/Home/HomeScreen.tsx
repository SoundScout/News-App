import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHomeScreen } from './useHomeScreen';
import ArticleCard from '../../components/ArticleCard';

export default function HomeScreen() {
  const { 
    articles, 
    loading,
    selectedArticleCount, 
    articleCountOptions, 
    isFilterVisible,
    toggleFilterVisibility,
    handleArticlePress,
    handleArticleCountSelect,
    loadArticlesByPreferences
  } = useHomeScreen();

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Ionicons name="newspaper-outline" size={24} color="#007AFF" />
        <Text style={styles.headerTitle}>Latest News</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity 
          style={styles.filterToggle} 
          onPress={toggleFilterVisibility}
        >
          <Ionicons 
            name={isFilterVisible ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#007AFF" 
          />
        </TouchableOpacity>
        <Text style={styles.articleCount}>
          {selectedArticleCount} articles
        </Text>
      </View>
    </View>
  );

  const renderFilterSection = () => {
    if (!isFilterVisible) return null;
    
    return (
      <View style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <Ionicons name="filter-outline" size={16} color="#666" />
          <Text style={styles.filterTitle}>Max Articles</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterOptions}
        >
          {articleCountOptions.map((count) => (
            <TouchableOpacity
              key={count}
              style={[
                styles.filterOption,
                selectedArticleCount === count && styles.filterOptionSelected
              ]}
              onPress={() => handleArticleCountSelect(count)}
            >
              <Text style={[
                styles.filterOptionText,
                selectedArticleCount === count && styles.filterOptionTextSelected
              ]}>
                {count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.apiLimitNote}>
          Limited to 10 articles (API restriction)
        </Text>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="newspaper-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>No Articles Found</Text>
      <Text style={styles.emptySubtitle}>
        Try selecting different topics in settings
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Loading articles...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderFilterSection()}
      
      {loading ? (
        renderLoadingState()
      ) : articles.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <ArticleCard article={item} onPress={() => handleArticlePress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadArticlesByPreferences}
              colors={['#007AFF']}
              tintColor="#007AFF"
            />
          }
        />
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
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterToggle: {
    padding: 4,
  },
  articleCount: {
    fontSize: 14,
    color: '#666',
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 4,
  },
  filterOptions: {
    paddingHorizontal: 16,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    marginRight: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#fff',
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
  apiLimitNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 16,
  },
});