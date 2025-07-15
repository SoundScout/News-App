import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import NewFullDetailsScreen from '../screens/NewFullDetails/NewFullDetailsScreen';
import PreferencesScreen from '../screens/Preferences/PreferencesScreen';
import { usePreferenceStore } from '../store/usePreferenceStore';
import { Article } from '../types/Article';

export type RootStackParamList = {
    Main: undefined;
    Details: {article: Article};
    Preferences: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator(){
    const hasPreferences = usePreferenceStore((state) => state.hasPreferences);

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions = {{ headerShown: false }}>
                {hasPreferences ? (
                    <>
                        <Stack.Screen name="Main" component={ BottomTabNavigator }/>
                        <Stack.Screen name="Details" component={ NewFullDetailsScreen }/>
                    </>
                ) : (
                    <Stack.Screen name="Preferences" component={ PreferencesScreen }/>
                )} 
            </Stack.Navigator>
        </NavigationContainer>
    );
}