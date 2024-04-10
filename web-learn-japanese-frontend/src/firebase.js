// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaU10DQd6f1tVfZGoq_-3ruXdmqBZ4jAE",
  authDomain: "learnjapanese-258f2.firebaseapp.com",
  projectId: "learnjapanese-258f2",
  storageBucket: "learnjapanese-258f2.appspot.com",
  messagingSenderId: "783431498624",
  appId: "1:783431498624:web:80a8a7a09306ae40eb5f65",
  measurementId: "G-NZ7Q1MMNX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)