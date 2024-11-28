import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
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

    const completeOnboarding = async (navigation) => {
        try {
            await AsyncStorage.setItem('onboardingComplete', 'true');
            setIsOnboarded(true);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error saving onboarding data: ', error);
        }
        
    };

    const logOut = async (navigation) => {
        await AsyncStorage.removeItem('onboardingComplete');
        await AsyncStorage.removeItem('name');
        await AsyncStorage.removeItem('email');
        setIsOnboarded(false);
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Onboarding' }],
            })
        );
    };

    if (!isLoaded) {
        return <SplashScreen />;
    }
    return (
        <Stack.Navigator initialRouteName={isOnboarded ? "Home" : "Onboarding"}>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen 
                name="Profile" 
                options={{ headerShown: false }} 
                >
                     
                {(props) => (
                    <ProfileScreen 
                        {...props} 
                        logOut = {()=> logOut(props.navigation)}
                    />
                )}
            </Stack.Screen> 
            <Stack.Screen
                name="Onboarding"
                options={{ headerShown: false }} // Hide header if needed
            >
                {(props) => (
                    <Onboarding
                     {...props}
                    completeOnboarding={()=>completeOnboarding(props.navigation)}
                    />
                )}
            </Stack.Screen>
            
        </Stack.Navigator>
    );
}