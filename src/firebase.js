// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrCQsL2CaFxkvowEE1-Sj9KnoPQAw05bM",
  authDomain: "todo-app-5d057.firebaseapp.com",
  projectId: "todo-app-5d057",
  storageBucket: "todo-app-5d057.appspot.com",
  messagingSenderId: "862675765606",
  appId: "1:862675765606:web:0fee39bd176d7fa0f460a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//Auth
export const auth = getAuth(app);
