import Dexie from "dexie";

export const db = new Dexie('generatedCards');
db.version(1).stores({
    card: '++id, keyword, definition',
    test: '++id, text'
});

export async function saveCards(Keyword) {
    try {  
        db.open;
        await db.test.add({text: `${Keyword}`});
    } catch (error) {
        console.log("Error occured while saving data:  ", error);
    } finally {
        db.close();
    }
}

