// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, signInWithCustomToken, updateEmail } from 'firebase/auth'
import { Session } from "next-auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIcZaPqXmdB-2tyz_ls8EwckrfGpMMuG0",
  authDomain: "inkspiff-c9578.firebaseapp.com",
  projectId: "inkspiff-c9578",
  storageBucket: "inkspiff-c9578.appspot.com",
  messagingSenderId: "993485008234",
  appId: "1:993485008234:web:54fab3086c334d00064913",
  measurementId: "G-Y9Y81BBMJT"
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: "inkspiff-c9578.firebaseapp.com",
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: "inkspiff-c9578.appspot.com",
  // messagingSenderId: "993485008234",
  // appId: "1:993485008234:web:54fab3086c334d00064913",
  // measurementId: "G-Y9Y81BBMJT"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export const db = getFirestore(app);
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);

export const auth = getAuth(app)



export async function syncFirebaseAuth(session: Session | null) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken)

      //   set identifier
      if (auth.currentUser) {
        await updateEmail(auth.currentUser, session.user.email);
      }

    } catch (error) {
      console.error('Error signing in with custom token:', error)
    }
  } else {
    auth.signOut()
  }
}

export function isUserLoggedIn() {
  return auth.currentUser !== null;
}
