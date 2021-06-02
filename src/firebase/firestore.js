import firebase from 'firebase';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCH1EJ8YFY6HeVoysubZMhUQIQqb9XFsGM",
    authDomain: "url-shortener-81daa.firebaseapp.com",
    databaseURL: "https://url-shortener-81daa-default-rtdb.firebaseio.com",
    projectId: "url-shortener-81daa",
    storageBucket: "url-shortener-81daa.appspot.com",
    messagingSenderId: "513478441442",
    appId: "1:513478441442:web:4cf886f26f5a1b2304e1bb",
    measurementId: "G-V60199CKQD"
});


  const db=firebase.firestore();
export default db;