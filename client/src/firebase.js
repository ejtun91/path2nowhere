import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB4gzpovnBYAtF_-8ZMeqlpygBMk-CsVho",
  authDomain: "blog-c048e.firebaseapp.com",
  projectId: "blog-c048e",
  storageBucket: "blog-c048e.appspot.com",
  messagingSenderId: "318507256837",
  appId: "1:318507256837:web:a823be85370ce63298e06c",
  measurementId: "G-KDEGXH3WGV",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
