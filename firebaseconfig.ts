import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA4KA_cRYtuV_MPYXDp7xmWpXqXn4qETeA",
    authDomain: "expo-todos-fb.firebaseapp.com",
    projectId: "expo-todos-fb",
    storageBucket: "expo-todos-fb.appspot.com",
    messagingSenderId: "759170877396",
    appId: "1:759170877396:web:94d8121e835d6c25aa3841",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
