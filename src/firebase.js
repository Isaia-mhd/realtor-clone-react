// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlQuN8yQCZ1dnnc4UUR1fbOJkGjzQ10nc",
  authDomain: "realtor-clone-react-bd827.firebaseapp.com",
  projectId: "realtor-clone-react-bd827",
  storageBucket: "realtor-clone-react-bd827.appspot.com",
  messagingSenderId: "762979812494",
  appId: "1:762979812494:web:83917d9433bb726e7075df"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()