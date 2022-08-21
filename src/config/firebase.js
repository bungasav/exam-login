import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAhDLOK4eGiQdfJc25AG5t-l0WIkf0jKIU",
  authDomain: "exam-2301957950.firebaseapp.com",
  projectId: "exam-2301957950",
  storageBucket: "exam-2301957950.appspot.com",
  messagingSenderId: "988608067737",
  appId: "1:988608067737:web:a157711d62f9280d606008"
};

const init = firebase.initializeApp(firebaseConfig);
export const firebaseAuthentication = init.auth();