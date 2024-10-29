// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsbLxdMVhULBmWp8iCwOSfq7gGTw4etMg",
  authDomain: "realtor-clone-react-2397d.firebaseapp.com",
  projectId: "realtor-clone-react-2397d",
  storageBucket: "realtor-clone-react-2397d.appspot.com",
  messagingSenderId: "808315756521",
  appId: "1:808315756521:web:2dada193cdae4b5ec63578"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()