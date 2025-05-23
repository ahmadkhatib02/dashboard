import { db } from "./firebase.js";
import { ref, set } from "firebase/database";
import inventory from './inventory.js';

const importItems = async () => {
  for (const item of inventory) {
    try {
      await set(ref(db, `inventory/${item.id}`), item)
      console.log(`Imported: ${item.name}`)
    } catch (error) {
      console.error(`Error importing ${item.name}:`, error)
    }
  }
}

importItems()