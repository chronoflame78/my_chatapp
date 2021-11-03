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
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
      const { email } = userAuth;
      const createdAt = new Date();

      try {
          await userRef.set({
              email,
              createdAt,
              isRegistered: false,
              ...additionalData
          })
      } catch (error) {
          console.log('error creating user', error.message);
      }
  }
  return userRef;
}

export const registerNewChatProfile = async (userData) => {
    const {userAuth} = userData;
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const { displayName, birthday, gender } = userData;
    const avatarString = displayName.replaceAll(' ', '+');
    const avatarURL = `https://ui-avatars.com/api/?name=${avatarString}`;

    try {
        await userRef.set({
            displayName,
            birthday,
            gender,
            avatarURL: avatarURL,
            isRegistered: true
        })
    } catch (error) {
        console.log('error creating user', error.message);
    }
    return userRef;
  }

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubcribe = auth.onAuthStateChanged(userAuth => {
          unsubcribe();
          resolve(userAuth);
      }, reject)
  })
}