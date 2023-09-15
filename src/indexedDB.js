// indexedDB.js
import { openDB } from 'idb';

const DB_NAME = 'videoDB';
const STORE_NAME = 'videos';

const openDatabase = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { autoIncrement: true });
      }
    },
  });
};

export const saveVideoToDB = async (videoBlob) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const timestamp = Date.now();
  store.add(videoBlob, timestamp);
  await tx.done;
};

export const getAllVideosFromDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);

  return await store.getAll();
};
