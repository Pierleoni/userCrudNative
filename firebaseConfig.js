import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeCCTrBqMs4yuhw2T_szWRtBT1VWgePPA",
  authDomain: "user-crud-990e6.firebaseapp.com",
  projectId: "user-crud-990e6",
  storageBucket: "user-crud-990e6.firebasestorage.app",
  messagingSenderId: "304392754507",
  appId: "1:304392754507:web:0850385db247052bb9c4ce",
};

// Inizializzazione Firebase
const app = initializeApp(firebaseConfig);

// Inizializzazione servizi
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
