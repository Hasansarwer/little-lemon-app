import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from '../screens/onboarding';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isOnboarded, setIsOnboarded] = useState(false);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            const value = await AsyncStorage.getItem('onboardingComplete');
            if (value !== null) {
                setIsOnboarded(true);
            }
            setIsLoaded(true);
        };
        checkOnboardingStatus();
    }, []);

    const completeOnboarding = async () => {
        await AsyncStorage.setItem('onboardingComplete', 'true');
        setIsOnboarded(true);
    };

    if (!isLoaded) {
        return <SplashScreen />;
    }
    return (
        <Stack.Navigator>
            {isOnboarded ? (
                <Stack.Screen name="Profile" component={ProfileScreen} />
            ) : (
                <Stack.Screen name="Onboarding" component={Onboarding} />
            )}
        </Stack.Navigator>
    );
}