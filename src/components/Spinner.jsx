import React from 'react'
import spinner from '../assets/svg/spinner.svg'
export default function Spinner() {
  return (
    <div className='bg-black bg-opacity-50 flex items-center justify-center fixed right-0 left-0 bottom-0 top-0 z50'>
        <div>
            <img src={spinner} alt="Loading..." className='h-24' />
        </div>
    </div>
  )
}
