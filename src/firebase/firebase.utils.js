import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCIF4IvXwFR3e07U-6TWfuHVmk-UXSIrjc",
    authDomain: "chatapp-db-90778.firebaseapp.com",
    projectId: "chatapp-db-90778",
    storageBucket: "chatapp-db-90778.appspot.com",
    messagingSenderId: "1041312984569",
    appId: "1:1041312984569:web:99f33d7a490603d18ea128",
    measurementId: "G-Q4M1BWET4Q",
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};
