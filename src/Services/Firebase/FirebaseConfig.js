// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9WaqmuBUsFQXVsvM-6VFtK4OBPcKOIzg",
  authDomain: "e-commerce-coder2022.firebaseapp.com",
  projectId: "e-commerce-coder2022",
  storageBucket: "e-commerce-coder2022.appspot.com",
  messagingSenderId: "141486845255",
  appId: "1:141486845255:web:b9d41ed7341ca4f150b062"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);