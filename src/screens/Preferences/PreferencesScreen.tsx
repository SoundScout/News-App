import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { usePreferencesScreen } from './usePreferencesScreen';

const TOPICS = ['general','technology', 'sports', 'business', 'entertainment', 'science', 'health'];

export default function PreferencesScreen() {
  const { savePreferences, selectedTopics, toggleTopic, capitalize, isTablet, isLargeTablet } = usePreferencesScreen();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={[
        styles.card,
        isTablet && styles.cardTablet,
        isLargeTablet && styles.cardLargeTablet
      ]}>
        <Text style={[
          styles.title,
          isTablet && styles.titleTablet,
          isLargeTablet && styles.titleLargeTablet
        ]}>
          Select Your News Topics
        </Text>
        
        <Text style={[
          styles.description,
          isTablet && styles.descriptionTablet,
          isLargeTablet && styles.descriptionLargeTablet
        ]}>
          Choose the topics you're interested in. We'll fetch articles based on your selections.
        </Text>

        <View style={styles.group}>
          <Text style={[
            styles.label,
            isTablet && styles.labelTablet,
            isLargeTablet && styles.labelLargeTablet
          ]}>
            Topics
          </Text>
          <View style={[
            styles.optionsContainer,
            isTablet && styles.optionsContainerTablet,
            isLargeTablet && styles.optionsContainerLargeTablet
          ]}>
            {TOPICS.map((topic) => (
              <TouchableOpacity
                key={topic}
                style={[
                  styles.option,
                  isTablet && styles.optionTablet,
                  isLargeTablet && styles.optionLargeTablet,
                  selectedTopics.includes(topic) && styles.optionSelected
                ]}
                onPress={() => toggleTopic(topic)}
              >
                <Text style={[
                  styles.optionText,
                  isTablet && styles.optionTextTablet,
                  isLargeTablet && styles.optionTextLargeTablet,
                  selectedTopics.includes(topic) && styles.optionTextSelected
                ]}>
                  {capitalize(topic)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[
          styles.buttonContainer,
          isTablet && styles.buttonContainerTablet,
          isLargeTablet && styles.buttonContainerLargeTablet
        ]}>
          <Button
            title="Save Preferences"
            onPress={() =>
              savePreferences({ topics: selectedTopics, categories: [] })
            }
            color="#007AFF"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cardTablet: {
    maxWidth: 600,
    padding: 32,
    borderRadius: 20,
  },
  cardLargeTablet: {
    maxWidth: 800,
    padding: 40,
    borderRadius: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  titleTablet: {
    fontSize: 28,
    marginBottom: 16,
  },
  titleLargeTablet: {
    fontSize: 32,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  descriptionTablet: {
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
  },
  descriptionLargeTablet: {
    fontSize: 18,
    marginBottom: 40,
    lineHeight: 26,
  },
  group: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '500',
    color: '#333',
  },
  labelTablet: {
    fontSize: 18,
    marginBottom: 16,
  },
  labelLargeTablet: {
    fontSize: 20,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  optionsContainerTablet: {
    gap: 12,
    justifyContent: 'space-between',
  },
  optionsContainerLargeTablet: {
    gap: 16,
    justifyContent: 'space-between',
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    minWidth: 80,
    alignItems: 'center',
  },
  optionTablet: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    minWidth: 100,
    flex: 1,
    maxWidth: '30%',
  },
  optionLargeTablet: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 28,
    minWidth: 120,
    flex: 1,
    maxWidth: '25%',
  },
  optionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  optionTextTablet: {
    fontSize: 16,
  },
  optionTextLargeTablet: {
    fontSize: 18,
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonContainerTablet: {
    marginTop: 32,
    borderRadius: 12,
  },
  buttonContainerLargeTablet: {
    marginTop: 40,
    borderRadius: 16,
  },
});