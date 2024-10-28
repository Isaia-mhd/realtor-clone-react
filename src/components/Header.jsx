import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
export default function Header() {
    const location = useLocation()
    const navigation = useNavigate()
    const [pageState, setPageState] = useState("Sign in")
    const auth = getAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setPageState("Profile");
            } else{
                setPageState("Sign in");
            }
        });  
    }, [auth]);
    function PathMatchRoute(route){
        if(location.pathname === route){
            return true
        }
    }
   
    
    
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div>
                <img src="https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg" alt="logo" className='h-5 cursor-pointer'onClick={()=>navigation("/")}/>
            </div>
            <div>
                <ul className='flex space-x-10'>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${PathMatchRoute("/") && 'text-gray-950 border-b-red-500'} `} onClick={()=> navigation("/")}>Home</li>

                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${PathMatchRoute("/offers") && 'text-gray-950 border-b-red-500'} `} onClick={()=> navigation("/offers")}>Offers</li>
                    
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${PathMatchRoute("/sign-in") || PathMatchRoute("/profile") && 'text-gray-950 border-b-red-500'} `} onClick={()=> navigation("/profile")}>{pageState}</li>
                </ul>
            </div>
            
        </header>
    </div>
  )
}
