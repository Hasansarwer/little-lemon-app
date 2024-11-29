import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { 
    Text, 
    View, 
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    ScrollView
 } from "react-native";

const Onboarding = ({ navigation, completeOnboarding }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleNext = async () => {
        try {
            // Save name and email in AsyncStorage
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);
            completeOnboarding(); // Call the completion function to move to the next screen
        } catch (error) {
            console.error("Error saving onboarding data: ", error);
        }
    };

    useEffect(() => {
        // Enable or disable the Next button based on input validation
        setIsButtonDisabled(!(name.length > 0 && email.length > 0));
    }, [name, email]);

    return (
        <ScrollView 
        contentContainerStyle ={styles.container}
        showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Image source={require("../assets/Logo.png")} style={styles.logo} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Let us get to know you</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        placeholder="Name"
                        keyboardType="default"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        isButtonDisabled && styles.buttonDisabled, // Apply disabled styling
                    ]}
                    disabled={isButtonDisabled}
                    onPress={()=>handleNext()} // Correct function call
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#EDEFEE'
    },
    header: {
        height: 100,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dee3e9",
    },
    logo: {
        width: 185,
        height: 40,
    },
    content: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        backgroundColor: "#cbd2d9",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 30,
        color: '#495E57',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: 20,
        color: '#495E57',
    },
    input: {
        width: "80%",
        marginVertical: 10,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: "#f0f0f0",
    },
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
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        color: '#495E57',
    },
});

export default Onboarding;
