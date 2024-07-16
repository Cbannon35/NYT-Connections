// Thank you chatGPT
import { ClientGame } from "./game";
const DB_NAME = 'myConnectionsDB';
const DB_VERSION = 1;
const STORE_NAME = 'myConnections';

export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

/**
 * Adds a game object to the indexedDB with the given date as the key
 * @param {String} date YYYY-MM-DD
 * @param {ClientGame} game 
 * @returns 
 */

export const addItem = async (date, game) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put({ id: date, game: game });

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

/**
 * Retrieves a game object from the indexedDB with the given date as the key
 * @param {String} id
 * @returns {{id: String, game: ClientGame}}
 */
export const getItem = async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};
