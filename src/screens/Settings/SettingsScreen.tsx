import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettingScreen } from './useSettingsScreen';

export default function SettingsScreen() { 
    const { showClearPreferencesAlert } = useSettingScreen();

    const renderHeader = () => (
        <View style={styles.header}>
            <Ionicons name="settings-outline" size={24} color="#007AFF" />
            <Text style={styles.headerTitle}>Settings</Text>
        </View>
    );

    const renderSection = (title: string, children: React.ReactNode) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );

    const renderSettingItem = (icon: string, title: string, subtitle: string, onPress: () => void, isDestructive = false, showChevron = true) => (
        <TouchableOpacity 
            style={styles.settingItem} 
            onPress={onPress}
            activeOpacity={0.7}
            disabled={!showChevron}
        >
            <View style={styles.settingItemLeft}>
                <View style={[styles.iconContainer, isDestructive && styles.iconContainerDestructive]}>
                    <Ionicons 
                        name={icon as any} 
                        size={20} 
                        color={isDestructive ? '#FF3B30' : '#007AFF'} 
                    />
                </View>
                <View style={styles.settingItemContent}>
                    <Text style={[styles.settingItemTitle, isDestructive && styles.settingItemTitleDestructive]}>
                        {title}
                    </Text>
                    <Text style={styles.settingItemSubtitle}>
                        {subtitle}
                    </Text>
                </View>
            </View>
            {showChevron && (
                <Ionicons 
                    name="chevron-forward" 
                    size={20} 
                    color="#ccc" 
                />
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            
            <View style={styles.content}>
                {renderSection(
                    'Preferences',
                    renderSettingItem(
                        'trash-outline',
                        'Clear Preferences',
                        'Reset your topic selections',
                        showClearPreferencesAlert,
                        true,
                        true
                    )
                )}

                {renderSection(
                    'About',
                    renderSettingItem(
                        'information-circle-outline',
                        'App Version',
                        '1.0.0',
                        () => {},
                        false,
                        false
                    )
                )}
            </View>
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
    content: {
        flex: 1,
        paddingTop: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
        paddingHorizontal: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    settingItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#f0f8ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    iconContainerDestructive: {
        backgroundColor: '#fff5f5',
    },
    settingItemContent: {
        flex: 1,
    },
    settingItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 2,
    },
    settingItemTitleDestructive: {
        color: '#FF3B30',
    },
    settingItemSubtitle: {
        fontSize: 14,
        color: '#666',
    },
});