// Firebase Configuration
// Using the keys provided by the user for project: habit-flow-b8795
const firebaseConfig = {
    apiKey: "AIzaSyCVV-u1J30n2fyCmxenOYqV8EK_5LkHRgw",
    authDomain: "habit-flow-b8795.firebaseapp.com",
    databaseURL: "https://habit-flow-b8795-default-rtdb.firebaseio.com",
    projectId: "habit-flow-b8795",
    storageBucket: "habit-flow-b8795.firebasestorage.app",
    messagingSenderId: "709763174072",
    appId: "1:709763174072:web:d0b0176c3df5a8d5c66e4d",
    measurementId: "G-P9WV02QDWG"
};

// Initialize Firebase
let auth, db;

if (typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        console.log("Firebase Initialized Successfully for habit-flow-b8795");
    } catch (e) {
        console.error("Firebase Init Error:", e);
    }
} else {
    console.warn("Firebase SDK not loaded");
}
