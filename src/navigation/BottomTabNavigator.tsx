import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator screenOptions = {{ headerShown: false }}>
            <Tab.Screen name = "Home" component={HomeScreen} 
                options={{ tabBarIcon: ({color, size}) => <Ionicons name="home-outline" color={color} size={size}/> }}
            />
            <Tab.Screen name = "Search" component={SearchScreen} 
                options={{ tabBarIcon: ({color, size}) => <Ionicons name="search-outline" color={color} size={size}/> }}
            />
            <Tab.Screen name = "Settings" component={SettingsScreen} 
                options={{ tabBarIcon: ({color, size}) => <Ionicons name="settings-outline" color={color} size={size}/> }}
            />

        </Tab.Navigator>
    );
}