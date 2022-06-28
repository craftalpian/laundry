// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6b7pIHKAaNplYfkT5cgRuEhQM3qn1AZk",
  authDomain: "laundry-a01dd.firebaseapp.com",
  projectId: "laundry-a01dd",
  storageBucket: "laundry-a01dd.appspot.com",
  messagingSenderId: "536268974217",
  appId: "1:536268974217:web:02faeb19ffa065eb99fe58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);