import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:
const firebaseConfig = {
  apiKey: "AIzaSyC142vjMrCKb4ib1dktsO2kPmosIWNUyaQ",
  authDomain: "todo-windows-quasar.firebaseapp.com",
  databaseURL: "https://todo-windows-quasar.firebaseio.com",
  projectId: "todo-windows-quasar",
  storageBucket: "todo-windows-quasar.appspot.com",
  messagingSenderId: "222201647811",
  appId: "1:222201647811:web:924448b007ede0abb68876"
};

const firebaseApp = firebase.initializeApp(firebaseConfig),
  db = firebase.firestore();

export { db, firebase };
