import React, { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import {db} from '../firebase'
export default function Profile() {
  const navigate = useNavigate()
  const auth = getAuth()
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName, 
    email: auth.currentUser.email, 
  });
  const {name, email} = formData

  function onChange(e){
    setFormData((prevState)=>({ 
      ...prevState, 
      [e.target.id]: e.target.value, 
    }));
  }
  function logOut(){
    auth.signOut()
    navigate("/")
  }

  async function onSubmit(){
    try {
      if(auth.currentUser.name !== name){
        // Update displayName in firebase authentication
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update the name in Firestore
        const docRef = doc(db, "users", auth.currentUser.uid)

        await updateDoc(docRef, {name})
      };
      toast.success("Profile details Updated")
      
    } catch (error) {
      toast.error("Could not update the profile detail")
    }
  }
  
  return (
    <section className='w-full max-w-5xl mx-auto flex flex-col justify-center items-center'>
      <h1 className='text-center font-bold text-3xl mt-6'>My Profile</h1>
      <div className='w-full md:w-[50%] px-4 mt-6'>
        <form>
          {/* Name input */}
          <input type="text" name="" id="name" value={name} onChange={onChange} disabled={!changeDetail} className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6 ${changeDetail && 'bg-red-200'}`} />

          {/* Email input */}
          <input type="email" name="" id="email" value={email} disabled className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6' />

          {/* Changing button / Sign out */}
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p>
              Do want change your name ?
              <span onClick={() => {
                changeDetail && onSubmit();
                setChangeDetail((prevState) => !prevState)
              }} className='px-1 text-red-600 hover:text-red-700 transition ease-in-out cursor-pointer'>{changeDetail ? "Apply change" : "Edit"}</span>
            </p>
            <p onClick={logOut} className='text-blue-700 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'>Sign out</p>
          </div>
        </form>
      </div>
    </section>
  )
}
