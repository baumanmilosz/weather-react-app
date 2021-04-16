import React from "react";
import ReactDOM from "react-dom";
import Root from "views/Root";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";
import "firebase/firestore";


export const firebaseConfig = {
  apiKey: "AIzaSyDlb7Jv8H7DW58LxqTroh9C_QmHjiwgtUU",
  authDomain: "weather-app-a72d4.firebaseapp.com",
  projectId: "weather-app-a72d4",
  storageBucket: "weather-app-a72d4.appspot.com",
  messagingSenderId: "314133855624",
  appId: "1:314133855624:web:47ee5cd4d93b4669bf8e3d",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.register();
