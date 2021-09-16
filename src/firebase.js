import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";





const firebaseConfig = {
    apiKey: "AIzaSyAlYyTEVZkvWerhGo6jUaOrgB2ZeJpEhyc",
    authDomain: "chattify-a9e43.firebaseapp.com",
    projectId: "chattify-a9e43",
    storageBucket: "chattify-a9e43.appspot.com",
    messagingSenderId: "786059516876",
    appId: "1:786059516876:web:722af7d45e5edab7e31b69",
    measurementId: "G-5MG4VWK1KF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;