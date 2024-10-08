import React from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function OAuth() {
  return (
    <button className='w-full bg-red-700 rounded px-7 py-3 text-white font-thin text-sm flex gap-2 items-center justify-center text-center uppercase hover:bg-red-800 active:bg-red-900 transition duration-150 ease-in-out'>
            <FcGoogle className='bg-white text-2xl rounded-full '/>
            Continue with Google
    </button>
  )
}
