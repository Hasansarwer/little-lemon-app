import React, {useEffect, useRef, useState} from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    Dimensions,
    ScrollView,
    FlatList
 } from 'react-native';  
import { Chip, Icon, Searchbar } from 'react-native-paper';

export default function HomeScreen({navigation}) {
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const { width } = Dimensions.get('window');

    const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
    const categories = ["Starters", "Main", "Desserts", "Drinks"];

    const Item = ({name, price, description, image}) => (
        <View style={styles.item}>
            <View style={[styles.description, {width: width-120}]} >
                <Text style= {styles.name}>{name}</Text>
                <Text numberOfLines={2} style = {styles.description}>{description}</Text>
                <Text style = {styles.price}>${price}</Text>
            </View>
            <View style={styles.imgContainer}>
                <Image source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`}} style={{ width: 100, height: 100 }} />
            </View>
        </View>
    );

    const handleSearchToggle = () => {
        setSearchVisible(!isSearchVisible);        
    };

    const fetchData = async() =>{
        try{
            const response = await fetch(API_URL);
            const json = await response.json();
            setMenuItems(json.menu);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
            fetchData();
    },[]);

    return (
        <View 
        style ={styles.container}
        // showsVerticalScrollIndicator={false}
        >
            
            <View style={{height: 100, width: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "white", paddingTop: 20 }}>
                <View style={{ width: 60, height: 60 }}></View>
                    <Image source={require("../assets/Logo.png")} style={{ width: 185, height: 44 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image source={require("../assets/Profile.png")} style={{ width: 60, height: 60 }} />
                    </TouchableOpacity>
            </View>
            <View style={styles.hero}>
                <Text style = {styles.display}>Little Lemon</Text>
                <View style={styles.direct}>
                <View style={styles.text}>
                    <Text style = {styles.subTitle}>Chicago</Text>
                    <Text style = {styles.paragraph}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                </View>
                <View style={styles.img}>
                    <Image source={require("../assets/Hero image.png")} style={styles.heroImage} />
                </View>
                </View>
                <Searchbar
                    placeholder="Search"
                    value={searchText}
                    onChangeText={setSearchText}
                    style={[styles.search, {width: width-40}]}
                    icon={isSearchVisible ? 'close' : 'magnify'}
                    onIconPress={handleSearchToggle}
                />
                
            </View>
            <View style={{borderBottomWidth: 2, borderColor: 'white', paddingBottom: 20}}>
            <Text style={styles.categoryTitle}>ORDER FOR DELIVERY!</Text>
            <View style={styles.categoryContainer}>
                {categories.map((category, index) => (
                    <Chip 
                    key={index} 
                    style={{margin: 8, 
                        alignItems: 'center', 
                        backgroundColor: 'white', 
                        fontSize: 18, 
                        color: '#F4CE14'
                    }}>
                        <Text style={{fontSize:18, color: '#495E57'}}>{category}</Text> </Chip>
                ))}
            </View>
            </View>
            <FlatList
                data={menuItems}
                renderItem={({item}) => <Item
                    name = {item.name}
                    price = {item.price}
                    image={item.image}
                    description={item.description}
                     />
                }
                />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#EDEFEE'
    },
    item:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#495E57',
        paddingVertical: 10
    },
    name:{
        fontSize:18,
        fontWeight: 'bold',
        paddingVertical: 10
    },
    description:{
        fontSize: 16,
        color: '#495E57'
    },
    price:{
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 10,
        color: '#495E57'
    },
    categoryContainer:{
        height: 50,
        justifyContent: 'flex-start',
        backgroundColor: '#EDEFEE',
        flexDirection: 'row'
    },
    search: {
        alignSelf: 'center',
        marginTop: 15,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#EDEFEE',
    },
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
    },
    display: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#F4CE14',
        marginLeft: 10,
    },
    subTitle: {
        fontSize: 24,
        fontWeight: 'medium',
        color: 'white',
        marginLeft: 10,
    },
    categoryTitle: {
        alignSelf: 'flex-start',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20
    },
    paragraph: {
        fontSize: 18,
        color: 'white',
        maxWidth: 200,
        lineHeight: 24,
        marginTop: 20,
        marginLeft: 10,
    },
    heroImage: {
        width: 160,
        height: 170,
        borderRadius: 16
    },
    img: {
        width: 160,
        height: 170,
        marginTop: 0,
    }
})