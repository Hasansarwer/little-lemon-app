import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';  

export default function HomeScreen({navigation}) {
    return (
        <View style ={{flex:1, alignItems: 'center', alignContent: "space-between"}}>
            <View style={{height: 100, width: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "white", paddingTop: 20 }}>
                <View style={{ width: 60, height: 60 }}></View>
                    <Image source={require("../assets/Logo.png")} style={{ width: 185, height: 44 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image source={require("../assets/Profile.png")} style={{ width: 60, height: 60 }} />
                    </TouchableOpacity>
            </View>
            <View style={[styles.hero, styles.direct]}>
                <View style={styles.text}>
                    <Text style = {styles.display}>Little lemon</Text>
                    <Text style = {styles.subTitle}>Chicago</Text>
                    <Text style = {styles.paragraph}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                </View>
                <View style={styles.img}>
                    <Image source={require("../assets/Hero image.png")} style={styles.heroImage} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    hero: {
        width: '100%',
        height: 324,
        backgroundColor: '#495E57'
    },
    text: {
        width: 210
    },
    direct: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        padding: 10
    },
    display: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#F4CE14',
        marginTop: 20,
    },
    subTitle: {
        fontSize: 24,
        fontWeight: 'medium',
        color: 'white'
    },
    paragraph: {
        fontSize: 16,
        color: 'white',
        maxWidth: 210,
        lineHeight: 24,
        marginTop: 20
    },
    heroImage: {
        width: 140,
        height: 170,
        marginTop: 30,
        borderRadius: 16
    },
    img: {
        width: 140,
        height: 170,
    }
})