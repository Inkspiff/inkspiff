// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "inkspiff-c9578.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "inkspiff-c9578.appspot.com",
  messagingSenderId: "993485008234",
  appId: "1:993485008234:web:54fab3086c334d00064913",
  measurementId: "G-Y9Y81BBMJT"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

// export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export const db = getFirestore(app);
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);