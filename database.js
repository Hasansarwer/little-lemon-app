import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('littleLemon');

// create table if not exists

export async function createTable(){
    await db.execAsync(
        `create table if not exists menuitems (
        id integer primary key not null,
        uuid text,
        name text,
        price float,
        category text,
        image text
        );`
    );
}

// get all menuItems
export async function getMenuItems() {
    const menuItems = await db.getAllAsync('select * from menuitems'); // getFirstAsync getEachAsync
    return menuItems;
}

// save menuitems

export async function saveMenuItems(menuItems){
    try{
        db.execAsync( //runAsync
            'insert into menuitems (uuis, title, price, category) values' + 
            menuItems.map((item) => `('${item.id}', ${item.name}', ${item.price}', ${item.category}', ${item.image}' )`).join(',')
        );
    } catch (error){
        console.error(error);
    }
}

export async function filterByQueryAndCategories(query, activeCategories) {
    let sql = 'select * from menuitems where title like ?';
    let params = [`%${query}%`];
    if (activeCategories.length) {
        sql += ' and category in (' + activeCategories.map(() => '?').join(',') + ')';
        params = params.concat(activeCategories);
    }
    const menuItems = await db.getAllAsync(sql, params);
    return menuItems;
}