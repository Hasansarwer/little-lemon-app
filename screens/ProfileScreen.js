import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';  
import { Checkbox } from 'react-native-paper';
import { MaskedTextInput } from "react-native-mask-text";
import Avatar from '../component/Avatar';

export default function ProfileScreen(name, email) {
    const [profileInfo, setProfileInfo] = React.useState({
        avatar: null,
        firstName: null,
        lastName: null,
        email: email,
        phone: '',
        orderStatus: false,
        newsLetter: false,
        passwordChange: false,
        specialOffers: false
    });

    function updateProfileInfo(key, value) {
        setProfileInfo({
            ...profileInfo,
            [key]: value
        });
    }
    return (
        <ScrollView 
            contentContainerStyle ={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={{width: '100%', height: 68, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#dee3e9', paddingTop:20, paddingHorizontal: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require("../assets/little-lemon-logo-grey.png")} style={{ width: 30, height: 36 }} />
                    <Text style={{fontSize: 20, padding: 10}}>LITTLE LEMON</Text>
                </View>
                <Avatar avatar={profileInfo?.avatar} firstName={profileInfo?.firstName} lastName={profileInfo?.lastName} big={false} />
            </View>
            <Text style={styles.title}>Avatar </Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft:20}}>
                {/* <Image source={require("../assets/avatar.png")} style={{ width: 100, height: 100, borderRadius: 50, margin: 20 }} /> */}
                <Avatar avatar={profileInfo?.avatar} firstName={profileInfo?.firstName} lastName={profileInfo?.lastName} big={true} />
                <TouchableOpacity style={{backgroundColor: "olive", borderColor: "yellow", padding: 10, borderRadius: 5, margin: 20}}>
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
                mask='(+880) 999-999999'
                value={profileInfo.phone}
                onChangeText={(text) => updateProfileInfo('phone', text)}
                style={styles.input}
                keyboardType='numeric'
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
                    onPress={Alert.alert('Log Out')}
                    >
                    <Text style={{textAlign: 'center'}}>Log out</Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: '50%'}}>
                    <TouchableOpacity style={{backgroundColor: "#fff", margin: 20, borderColor: "olive", padding: 10, borderRadius: 5, marginTop: 20}}>
                        <Text style={{textAlign: 'center'}}>Discard changes</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '50%'}}>
                    <TouchableOpacity style={{backgroundColor: "olive", padding: 10, borderRadius: 5, margin: 20}}>
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