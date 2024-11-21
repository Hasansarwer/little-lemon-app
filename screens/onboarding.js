import { useState } from "react";
import { 
    Text, 
    View, 
    Button,
    TextInput,
    Image
 } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import PagerView from 'react-native-pager-view';

const Onboarding = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <PagerView style={{ flex: 1 }} initialPage={0} onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}>
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
                </View>
                <View style={{height: 100, width: "100%",  backgroundColor: "#dee3e9" }}>
                    <Button style={{backgroundColor: '#cbd2d9'}} title="Next" onPress={() => setCurrentPage(1)} />
                </View>
            </View>
            <View key="2" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <Image source={require("../assets/onboarding-2.png")} style={{ width: 200, height: 200 }} /> */}
                <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Create an Account</Text>
                <Text style={{ fontSize: 16, textAlign: "center" }}>Sign up to get started</Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={{ width: "80%", marginVertical: 10, padding: 10, borderColor: MD3Colors.grey500, borderWidth: 1, borderRadius: 5 }}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={{ width: "80%", marginVertical: 10, padding: 10, borderColor: MD3Colors.grey500, borderWidth: 1, borderRadius: 5 }}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={{ width: "80%", marginVertical: 10, padding: 10, borderColor: MD3Colors.grey500, borderWidth: 1, borderRadius: 5 }}
                />
            </View>
            <View key="3" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <Image source={require(  "../assets/onboarding-3.png")} style={{ width: 200, height: 200 }} /> */}
                <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>All Set!</Text>
                <Text style={{ fontSize: 16, textAlign: "center" }}>You're ready to go!</Text>
                <Button title="Get Started" onPress={() => alert("Get Started")} />
            </View>
        </PagerView>
    );
}

export default Onboarding;