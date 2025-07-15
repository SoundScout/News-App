import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useNewFullDetailsScreen } from './useNewFullDetails';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Article } from '../../types/Article';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function NewFullDetailsScreen({ route }: Props){
  const { article } = route.params;
  const { openArticle, fullContent, isLoadingContent } = useNewFullDetailsScreen(article);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Article</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {openArticle.urlToImage && (
          <Image source={{ uri: openArticle.urlToImage }} style={styles.image} />
        )}
        
        <View style={styles.articleContent}>
          <Text style={styles.title}>{openArticle.title}</Text>
          
          <View style={styles.metaInfo}>
            {openArticle.author && (
              <Text style={styles.author}>By {openArticle.author}</Text>
            )}
            <Text style={styles.source}>{openArticle.source?.name}</Text>
            <Text style={styles.date}>
              {new Date(openArticle.publishedAt).toLocaleDateString()}
            </Text>
          </View>

          <Text style={styles.description}>{openArticle.description}</Text>
          
          {isLoadingContent ? (
            <Text style={styles.loadingText}>Loading full article...</Text>
          ) : fullContent ? (
            <Text style={styles.articleText}>{fullContent}</Text>
          ) : openArticle.content ? (
            <Text style={styles.articleText}>{openArticle.content}</Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 32,
  },
  metaInfo: {
    marginBottom: 16,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  source: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#333',
  },
  articleText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});