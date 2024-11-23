import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { 
    Text, 
    View, 
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet
 } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";
// import PagerView from 'react-native-pager-view';

const Onboarding = ({navigation, completeOnboarding}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handaleNext = async () => {
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('email', email);
        completeOnboarding();
        // navigation.navigate('ProfileScreen', {name: name, email: email});
    }

    useEffect(() => {
        if (name.length > 0 && email.length > 0) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [name, email]);

    return (
        // <PagerView style={{ flex: 1 }} initialPage={0} onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}>
            <View key="1" style={{ flex: 1,  alignItems: "center"}}>
                <View style={{height: 100, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#dee3e9" }}>
                    <Image source={require("../assets/little-lemon-logo-grey.png")} style={{ width: 50, height: 60 }} />
                    <Text style={{ fontSize: 24, fontWeight: "bold", padding:10 }}>LITTLE LEMON</Text>
                </View>
                <View style={{flex: 1, alignItems: "center", width: "100%", backgroundColor: "#cbd2d9" }}>
                {/* <Image source={require("../assets/onboarding-1.png")} style={{ width: 200, height: 200 }} /> */}
                    <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", paddingTop: 30 }}>Let us get to know you</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center", marginTop: 100 }}>First Name</Text>
                <TextInput
                    // placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={{ width: "80%", marginVertical: 10, padding: 10, borderColor: MD3Colors.grey500, borderWidth: 1, borderRadius: 5 }}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center" }}>Email</Text>
                <TextInput
                    // placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={{ width: "80%", marginVertical: 10, padding: 10, borderColor: MD3Colors.grey500, borderWidth: 1, borderRadius: 5 }}
                />
                {/* <Button style={{backgroundColor: '#fff', width: '25%',borderRadius:5}} title="Next" onPress={() => setCurrentPage(1)} /> */}
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", marginTop: 50, backgroundColor: "#f0f0f0" }}>
                    <TouchableOpacity 
                    // style={{ backgroundColor: "#cbd2d9", margin:30, paddingHorizontal: 20, paddingVertical:10, borderRadius: 5 }} 
                    style={[
                        styles.button,
                        isButtonDisabled && styles.buttonDisabled, // Apply disabled styling
                    ]}
                    disabled={isButtonDisabled} 
                    onPress={() => handaleNext()}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center" }} >Next</Text>
                    </TouchableOpacity>
                </View>
                </View>
                
            </View>
            
            
        // </PagerView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#cbd2d9",
        margin: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonDisabled: {
        backgroundColor: "#aaa",
    },
});

export default Onboarding;