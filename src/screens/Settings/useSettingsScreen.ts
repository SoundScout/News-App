import { Alert } from 'react-native';
import { usePreferenceStore } from "../../store/usePreferenceStore";

export function useSettingScreen() {
    const clearPreferences = usePreferenceStore((state) => state.clearPreferences);
    
    const handleClearPreferences = () => {
        clearPreferences();
    };

    const showClearPreferencesAlert = () => {
        Alert.alert(
            'Clear Preferences',
            'Are you sure you want to clear all your preferences? This will reset your topic selections.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: handleClearPreferences,
                },
            ]
        );
    };
    
    return {
        handleClearPreferences,
        showClearPreferencesAlert
    };
}