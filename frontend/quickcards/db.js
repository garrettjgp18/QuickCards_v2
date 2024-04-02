import Dexie from "dexie";

// Declare Database
export const db = new Dexie('generatedCards');
db.version(1).stores({
    card: '++id, keyword, definition',
    // test: '++id, text'
});

// modified method to save cards to the database
export async function saveCards(front, back) {
    try {
        // wait for database to properly open before proceding
        await db.open();
        // ensure properly opened
        console.log("Database open: ", db.isOpen());
        // define object to hold data being added to database.
        // wait for promise to resolve before adding to database.
        const newItem = await db.card.add({
            keyword: `${front}`,
            definition: `${back}`,
        });
        return (newItem);
    } catch (error) {
        console.log("Error occured while saving data:  ", error);
    } finally {
        db.close();
    }
}

// TODO - return all cards in the database
export async function getCards() {
    try {

    } catch {

    }

}