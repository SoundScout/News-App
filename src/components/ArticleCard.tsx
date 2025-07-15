import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Article } from '../types/Article';

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
}

export default function ArticleCard({ article, onPress }: ArticleCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : null}
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{article.description}</Text>
        <Text style={styles.author}>{article.author ? `By ${article.author}` : ''}</Text>
        <Text style={styles.source}>{article.source?.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  content: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    color: '#888',
  },
  source: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});
