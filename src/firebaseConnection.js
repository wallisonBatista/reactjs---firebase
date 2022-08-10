import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCQVIldCOgM9rNbwh8QhZuK9Ovj5l0c6Pk",
    authDomain: "reactjs-firebase-e35c3.firebaseapp.com",
    projectId: "reactjs-firebase-e35c3",
    storageBucket: "reactjs-firebase-e35c3.appspot.com",
    messagingSenderId: "1062747749935",
    appId: "1:1062747749935:web:0dcfffb81fdc424b0d10da",
    measurementId: "G-KWN12ZCZS6"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db }