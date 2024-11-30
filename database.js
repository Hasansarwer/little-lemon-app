import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

const db = SQLite.openDatabaseSync('littleLemon');

// create table if not exists

export async function dropTable() {
    await db.execAsync(
        `drop table if exists menuitems;`
    ).catch((error) => {
        console.error(error);
        Alert.alert('Database:', error.message);
    });
}

export async function createTable(){
    // await db.execAsync(
    //     ` drop table if exists menuitems;`
    // ).catch((error) => {
    //     console.error(error);
    //     Alert.alert('Database:', error.message);
    // });

    await db.execAsync(
        `create table if not exists menuitems (
        id integer primary key not null,
        uuid text,
        name text,
        description text,
        price float,
        category text,
        image text
        );`
    ).catch((error) => {
        console.error(error);
    });
}

// get all menuItems
export async function getMenuItems() {
    const menuItems = await db.getAllAsync('select * from menuitems') ; // getFirstAsync getEachAsync
    return menuItems;
}

// save menuitems

export async function saveMenuItems(menuItems){
    try{
        const query = 'insert into menuitems (name, description, price, category, image) values ' +
        menuItems.map((item, index) => `("${item.name}", "${item.description}", ${item.price}, "${item.category}", "${item.image}")`).join(',');
        db.execAsync( //runAsync
            'insert into menuitems (name, description, price, category, image) values ' +
            menuItems.map((item, index) => `("${item.name}", "${item.description}", ${item.price}, "${item.category}", "${item.image}")`).join(',')
        ).catch((error) => {
            console.error(error);
        });
    } catch (error){
        console.error(error);
    } 
}

export async function filterByQueryAndCategories(query, activeCategories) {
    activeCategories = activeCategories.map((item) => item.toLowerCase());
    let sql = 'select * from menuitems where name like ?';
    let params = [`%${query}%`];
    if (activeCategories.length) {
        sql += ' and category in (' + activeCategories.map(() => '?').join(',') + ')';
        params = params.concat(activeCategories);
    }
    const menuItems = await db.getAllAsync(sql, params);
    return menuItems;
}