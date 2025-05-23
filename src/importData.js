import { db } from "./firebaseNode.js";
import { ref, set } from "firebase/database";
import inventory from './inventory.js';
import orders from './orders.js';

console.log("Starting import process...");
console.log(`Inventory items to import: ${inventory.length}`);
console.log(`Orders to import: ${orders.length}`);

// Helper function to set data with a timeout
const setWithTimeout = async (reference, data, timeoutMs = 15000) => {
  return Promise.race([
    set(reference, data),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
    )
  ]);
};

const importItems = async () => {
  console.log("\n=== Importing Inventory Items ===");
  for (const item of inventory) {
    try {
      console.log(`Attempting to import: ${item.name} (ID: ${item.id})`);
      await setWithTimeout(ref(db, `inventory/${item.id}`), item);
      console.log(`✅ Successfully imported: ${item.name}`);
    } catch (error) {
      console.error(`❌ Error importing ${item.name}:`, error.message);
    }
  }
}

const importOrders = async () => {
  console.log("\n=== Importing Orders ===");
  for (const order of orders) {
    try {
      console.log(`Attempting to import order: ${order.fullName} (ID: ${order.id})`);
      await setWithTimeout(ref(db, `orders/${order.id}`), order);
      console.log(`✅ Successfully imported order: ${order.fullName}`);
    } catch (error) {
      console.error(`❌ Error importing order ${order.fullName}:`, error.message);
    }
  }
}

const runImport = async () => {
  try {
    await importItems();
    await importOrders();
    console.log("\n🎉 Import process completed!");
  } catch (error) {
    console.error("💥 Import process failed:", error);
  }
};

runImport();