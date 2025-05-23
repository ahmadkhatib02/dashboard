// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file (go up one directory from src)
dotenv.config({ path: resolve(__dirname, '../.env') });

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
  // Add the database URL - this is critical for Realtime Database
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL
};

console.log("Firebase config:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Pass the app instance to getDatabase

console.log("Firebase initialized successfully");

export { db };
