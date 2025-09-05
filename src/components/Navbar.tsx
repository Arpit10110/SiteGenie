import Image from 'next/image'
import React from 'react'
import logo from "@/assets/logo.png"
import Link from 'next/link'
const Navbar = () => {
  return (
    <>
        <nav  className='flex justify-between  items-center w-[85%] m-auto bg-transparent mt-[2.5rem] rounded-[10px] py-[0.5rem] px-[1rem] border-[1px] border-gray-700 ' >
            <div className='flex  items-center gap-[0.5rem] w-[20%]   ' >
                <Image className='w-[12%]' src={logo} alt='SiteGenie' />
                <Link href={"/"} className='robot-font text-[2.5rem]  ' >SiteGenie</Link>
            </div>
            <div className='flex items-center  gap-[2rem] min-w-[38%]   ' > 
                <Link className='text-[1.7rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/"} >Home</Link>
                <Link className='text-[1.7rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/"} >About</Link>
                <Link className='text-[1.7rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/"} >Pricing</Link>
                <Link className='text-[1.7rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/"} >GenieLab</Link>
            </div>
            <div className='flex max-w-sm  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg  ' >
                <Link className=' bg-gray-950 px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font hover:bg-gray-900 transition-all  ' href={"/login"} >Get Started</Link>
            </div>
            
        </nav>
    </>
  )
}

export default Navbar