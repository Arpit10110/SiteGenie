import LginForm from '@/components/LoginForm'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center ' >
    <div className='w-[50%] max-tablet:w-[80%] max-mobile:w-[90%] bg-black border-[1px] border-gray-700  p-[1rem] rounded-[5px] flex flex-col gap-[1.5rem] justify-center items-center' >
        <div className='w-full flex flex-col gap-[0.5rem] justify-center items-center ' >
            <h2 className='text-[2rem] text-gray-300 ' >Sign in to SiteGenie</h2>
            <h3 className='text-[1.5rem] text-gray-300 ' >Welcome back! Please sign in to continue</h3>
        </div>
        <LginForm/>
        <div className='w-full  justify-between items-center flex' >
            <div className='w-[45%] h-[0.1vh] bg-gray-600 ' ></div>
            <h2 className='text-[1.5rem] text-gray-300 font-semibold ' >Or</h2>
            <div className='w-[45%] h-[0.1vh] bg-gray-600 ' ></div>
        </div>
        <button  className='w-[80%]  m-auto text-white bg-gray-800 text-[1.5rem] py-[0.3rem] cursor-pointer hover:scale-[1.02] font-semibold  transition-all rounded-[5px]' >LogIn with Google</button>
        <Link href={"/signup"} className=' text-blue-400 text-[1.5rem] underline ' >Don't have an account? Sign up</Link>
    </div>
 </div>
  )
}

export default Page