import * as React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

export default function Avatar({avatar, firstName, lastName, big}) {
    const getInitials = (firstName, lastName) => {
        if(!firstName && !lastName) return '?';
        if(firstName?.lenth>0) return firstName[0].toUpperCase();
        if(lastName?.length>0) return lastName[0].toUpperCase();
    }
        return(
            <View style={big ? styles.avatarContainer : styles.avatarContainerSmall}>
                <Image source={avatar} style = {styles.avatarImage} />
            </View>
        );
    

};

const styles = StyleSheet.create({
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'olive', // Fallback background color
        marginBottom: 20,
    },
    avatarContainerSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'olive', // Fallback background color
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    fallbackAvatar: {
        backgroundColor: '#007BFF', // A unique background for initials
    },
    
    avatarText: {
        color: '#fff',
        fontSize: 72,
        fontWeight: 'bold',
    },
    avatarTextSmall: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

