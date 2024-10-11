import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { db } from '../firebase'
import {toast} from 'react-toastify'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router'

export default function OAuth() {

  const navigate = useNavigate()
  async function onGoogleClick(){
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // check the user
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate("/")
      } else{
        toast.error("User already registered !")
        navigate("/sign-up")

      }
     

    } catch (error) {
      console.log(error);
      toast.error("Couldn't authorize with Google");
    }
   
  }
  return (
    <button type='button' onClick={onGoogleClick} className='w-full bg-red-700 rounded px-7 py-3 text-white font-thin text-sm flex gap-2 items-center justify-center text-center uppercase hover:bg-red-800 active:bg-red-900 transition duration-150 ease-in-out'>
            <FcGoogle className='bg-white text-2xl rounded-full '/>
            Continue with Google
    </button>
  )
}
