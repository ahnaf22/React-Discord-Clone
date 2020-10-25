import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBLIdkaWYDwJIjBNSS4GVjhq8DcO8pOOfY",
    authDomain: "discord-clone-2bab4.firebaseapp.com",
    databaseURL: "https://discord-clone-2bab4.firebaseio.com",
    projectId: "discord-clone-2bab4",
    storageBucket: "discord-clone-2bab4.appspot.com",
    messagingSenderId: "22001226495",
    appId: "1:22001226495:web:fa82d0782a40313fcdb2ca",
    measurementId: "G-2835PRP6ZT"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebaseapp.firestore();
const auth = firebaseapp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;