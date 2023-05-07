import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDKCYf3JoDmRu6NFgJrVKTICBpsp57SBv4",
    authDomain: "url-shortner-79aa8.firebaseapp.com",
    projectId: "url-shortner-79aa8",
    storageBucket: "url-shortner-79aa8.appspot.com",
    messagingSenderId: "858719030178",
    appId: "1:858719030178:web:71966e1dede3a1d8ccc0fb",
    measurementId: "G-J03ZLSD80J"
};

const app = initializeApp(firebaseConfig);
export const fire = getFirestore(app)
export const auth = getAuth()
