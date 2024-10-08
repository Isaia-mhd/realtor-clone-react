import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
export default function Header() {
    const location = useLocation()
    const navigation = useNavigate()
    console.log(location)
    function PathMathRoute(route){
        if(location.pathname === route){
            return true
        }
    }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-0'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div>
                <img src="https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg" alt="logo" className='h-5 cursor-pointer'onClick={()=>navigation("/")}/>
            </div>
            <div>
                <ul className='flex space-x-10'>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${PathMathRoute("/") && 'text-gray-950 border-b-red-600'} `} onClick={()=>navigation("/")}>Home</li>

                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${PathMathRoute("/offers") && 'text-gray-950 border-b-red-600'} `} onClick={()=>navigation("/offers")}>Offers</li>
                    
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${PathMathRoute("/sign-in") && 'text-gray-950 border-b-red-600'} `} onClick={()=>navigation("/sign-in")}>Sign in</li>
                </ul>
            </div>
            
        </header>
    </div>
  )
}
