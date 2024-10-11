import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from '../components/OAuth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify'
export default function SignIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  function onChange(e){
    setFormData((prevState)=>({ 
      ...prevState,
      [e.target.id]: e.target.value, 
      
    }));

  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCredential.user)
      if(userCredential){
        navigate("/")
      } 
    } catch (error) {
      toast.error("Something went wrong !")
      console.log(error);
      
    }
  }
  return (
    <section>
      <h1 className='text-center text-3xl mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 rounded-2xl'>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGtleXxlbnwwfHwwfHx8MA%3D%3D" alt="key" className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input className='my-3 w-full px-4 py-2 text-xl text-gray-500 bg-white border-gray-300 rounded transition ease-in-out' type="email" name="" id="email" value={email} onChange={onChange} placeholder='Email adress'/>

            <div className='my-3 relative'>
              <input className=' w-full px-4 py-2 text-xl text-gray-500 bg-white border-gray-300 rounded transition ease-in-out' type={showPassword ? "text" : "password"} name="" id="password" value={password} onChange={onChange} placeholder='Password'/>

              {showPassword ? (
                <AiFillEyeInvisible className='absolute right-3 top-3 cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>
              ) : (
                <AiFillEye className='absolute right-3 top-3 cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>
              ) }
            </div>
            <div className='my-3 w-full flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='text-gray-500'>Don't have an account?
                <Link to="/sign-up" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password ?</Link>
              </p>
            </div>
            <div className='w-full bg-blue-600 rounded px-7 py-3 text-center text-white text-sm font-medium  uppercase transition duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-800'>
              <button type="submit" className='uppercase font-semibold'>Sign in</button>
            </div>
            <div className='my-3 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth/>
          </form>
        </div>
      </div>
    </section>
  )
}
