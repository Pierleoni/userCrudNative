// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFireStore} from "firebase/firestore"; 
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAeCCTrBqMs4yuhw2T_szWRtBT1VWgePPA",
    authDomain: "user-crud-990e6.firebaseapp.com",
    projectId: "user-crud-990e6",
    storageBucket: "user-crud-990e6.firebasestorage.app",
    messagingSenderId: "304392754507",
    appId: "1:304392754507:web:0850385db247052bb9c4ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFireStore(app);
const auth = getAuth(app);



export {app, db, auth};