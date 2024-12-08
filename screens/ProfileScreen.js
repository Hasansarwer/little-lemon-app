import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';  
import { Checkbox } from 'react-native-paper';
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatar from '../component/Avatar';
export default function ProfileScreen({ navigation, logOut}) {
    const [profileInfo, setProfileInfo] = useState({
        imgSrc: require("../assets/Profile.png"),
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        orderStatus: false,
        newsLetter: false,
        passwordChange: false,
        specialOffers: false
    });

    const saveChanges = async () => {
        try {
            await AsyncStorage.setItem('profileInfo', JSON.stringify(profileInfo));
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    const discardChanges = async () => {
        try {
            const profile = await AsyncStorage.getItem('profileInfo');
            setProfileInfo(JSON.parse(profile));
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if(!result.cancelled) {
                console.log(result);
                setProfileInfo({
                    ...profileInfo,
                    imgSrc: {uri: result.assets[0].uri}
                });
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    function updateProfileInfo(key, value) {
        setProfileInfo({
            ...profileInfo,
            [key]: value
        });
    }

    useEffect(() => {
        (async () => {
            try {
                const profile = await AsyncStorage.getItem('profileInfo');
                if(profile) {
                    setProfileInfo(JSON.parse(profile));
                }else {
                    const name = await AsyncStorage.getItem('name');
                    const email = await AsyncStorage.getItem('email');
                    setProfileInfo({
                        ...profileInfo,
                        firstName: name,
                        email: email
                    });
                }
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        })();
    }, []);
    
    return (
        <ScrollView 
            contentContainerStyle ={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={{height: 100, width: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "white", paddingTop: 20 }}>
                <View style={{ width: 60, height: 60 }}></View>
                    <Image source={require("../assets/Logo.png")} style={{ width: 185, height: 44 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image source={profileInfo.imgSrc} style={{ width: 60, height: 60 }} />
                    </TouchableOpacity>
            </View>
            <Text style={styles.title}>Avatar </Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft:20}}>
                {/* <Image source={require("../assets/avatar.png")} style={{ width: 100, height: 100, borderRadius: 50, margin: 20 }} /> */}
                <Avatar avatar={profileInfo.imgSrc} firstName={profileInfo?.firstName} lastName={profileInfo?.lastName} big={true} />
                <TouchableOpacity 
                    style={{backgroundColor: "olive", borderColor: "yellow", padding: 10, borderRadius: 5, margin: 20}}
                    onPress={pickImage}
                >
                    <Text style={{textAlign: 'center', color: 'white'}}>Change</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderColor: "olive", padding: 10, margin: 20, borderWidth: 1}}>
                    <Text style={{textAlign: 'center'}}>Remove</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>First Name </Text>
            <TextInput 
                value={profileInfo.firstName}
                onChangeText={(text) => updateProfileInfo('firstName', text)}
                style={styles.input}
            />

            <Text style={styles.title}>Last Name </Text>
            <TextInput 
                value={profileInfo.lastName}
                onChangeText={(text) => updateProfileInfo('lastName', text)}
                style={styles.input}
            />

            <Text style={styles.title}>Email </Text>
            <TextInput 
                value={profileInfo.email}
                onChangeText={(text) => updateProfileInfo('email', text)}
                style={styles.input}
            />

            <Text style={styles.title}>Phone </Text>
            <MaskedTextInput 
                mask='(999) 999-9999'
                value={profileInfo.phone}
                onChangeText={(text) => updateProfileInfo('phone', text)}
                style={styles.input}
                keyboardType='numeric'
                placeholder='(123) 456-7890'
            />

            <Text style={styles.title}>Email notifications </Text>
            <View style={styles.Checkbox}>
                <Checkbox
                    status={profileInfo.orderStatus ? 'checked' : 'unchecked'}
                    onPress={() => updateProfileInfo('orderStatus', !profileInfo.orderStatus)}
                />
                <Text style={styles.checkTitle}>Order Status </Text>
            </View>
            <View style={styles.Checkbox}>
                <Checkbox
                    status={profileInfo.passwordChange ? 'checked' : 'unchecked'}
                    onPress={() => updateProfileInfo('passwordChange', !profileInfo.passwordChange)}
                />
                <Text style={styles.checkTitle}>Password changes </Text>
            </View>
            <View style={styles.Checkbox}>
                <Checkbox
                    status={profileInfo.specialOffers ? 'checked' : 'unchecked'}
                    onPress={() => updateProfileInfo('specialOffers', !profileInfo.specialOffers)}
                />
                <Text style={styles.checkTitle}> Special Offerss </Text>
            </View>
            <View style={styles.Checkbox}>
                <Checkbox
                    style={{borderRadius: 5}}
                    status={profileInfo.newsLetter ? 'checked' : 'unchecked'}
                    onPress={() => updateProfileInfo('newsLetter', !profileInfo.newsLetter)}
                />
                <Text style={styles.checkTitle}>Newsletter </Text>
            </View>
            <View style={{width: '90%'}}>
                <TouchableOpacity 
                    style={{backgroundColor: "gold", borderColor: "yellow", padding: 10, borderRadius: 5, marginTop: 20}}
                    onPress={() => logOut()}
                    >
                    <Text style={{textAlign: 'center'}}>Log out</Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: '50%'}}>
                    <TouchableOpacity 
                        style={{backgroundColor: "#fff", margin: 20, borderColor: "olive", padding: 10, borderRadius: 5, marginTop: 20}}
                        onPress={discardChanges}
                        >
                        <Text style={{textAlign: 'center'}}>Discard changes</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '50%'}}>
                    <TouchableOpacity 
                    style={{backgroundColor: "olive", padding: 10, borderRadius: 5, margin: 20}}
                    onPress={saveChanges}
                    >
                        <Text style={{textAlign: 'center', color: 'white'}}>Save changes</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
    },
    Checkbox: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    checkTitle: {
        fontSize: 16,
        marginTop: 8,
    }
});