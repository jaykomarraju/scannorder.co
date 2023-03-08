import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const config = {
    apiKey: "AIzaSyBlT0gFe6VYoEGkgL-8BqJsvMWlkdbLzt4",
    authDomain: "scannorder-fc70a.firebaseapp.com",
    databaseURL: "https://scannorder-fc70a-default-rtdb.firebaseio.com",
    projectId: "scannorder-fc70a",
    storageBucket: "scannorder-fc70a.appspot.com",
    messagingSenderId: "874928934254",
    appId: "1:874928934254:web:7775f6a27d39aca4cb857f",
    measurementId: "G-SB96FP3215"
};

firebase.initializeApp(config);

const FirebaseAuth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { FirebaseAuth, db, storage };
