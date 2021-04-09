import  firebase from 'firebase';
var firebaseConfig = {
    apiKey: "*******",
    authDomain: "e-cart-18590.firebaseapp.com",
    databaseURL: "https://e-cart-18590-default-rtdb.firebaseio.com",
    projectId: "e-cart-18590",
    storageBucket: "e-cart-18590.appspot.com",
    messagingSenderId: "******",
    appId: "**********",
    measurementId: "********"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
export default firebase;  