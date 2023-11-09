// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsjglFVFZLdKkLeduEvysUgOyHsx5dhWQ",
    authDomain: "cart-2e793.firebaseapp.com",
    projectId: "cart-2e793",
    storageBucket: "cart-2e793.appspot.com",
    messagingSenderId: "992170860105",
    appId: "1:992170860105:web:560f037b663607ba276998"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
