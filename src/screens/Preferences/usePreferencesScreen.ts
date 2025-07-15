import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { usePreferenceStore } from '../../store/usePreferenceStore';

export function usePreferencesScreen() {
  const setPreferences = usePreferenceStore((state) => state.setPreferences);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['general']);
  const { width } = useWindowDimensions();
  
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const savePreferences = (prefs: { topics: string[]; categories: string[] }) => {
    setPreferences(prefs);
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return { 
    savePreferences,
    selectedTopics,
    toggleTopic,
    capitalize,
    isTablet,
    isLargeTablet
  };
}