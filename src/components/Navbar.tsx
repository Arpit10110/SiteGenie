import Image from 'next/image'
import React from 'react'
import logo from "@/assets/logo.png"
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = () => {
  return (
    <>
    <div className='w-full flex justify-center items-center relative' >
        <nav  className=' backdrop-blur-[10px] fixed top-[2.5rem] z-[20] flex justify-between  items-center w-[85%] m-auto bg-transparent rounded-[10px] py-[0.5rem] px-[1rem] border-[1px] border-gray-700 ' >
            <div className='flex  items-center gap-[0.5rem] w-[20%]   ' >
                <Image className='w-[12%]' src={logo} alt='SiteGenie' />
                <Link href={"/"} className='robot-font text-[2.5rem]  ' >SiteGenie</Link>
            </div>
            <div className='flex items-center  gap-[3rem] min-w-[38%] max-laptop:hidden  ' > 
                <Link className='text-[1.5rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/"} >Home</Link>
                <Link className='text-[1.5rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/"} >About</Link>
                <Link className='text-[1.5rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/"} >Pricing</Link>
                <Link className='text-[1.5rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/"} >GenieLab</Link>
            </div>
            <div className='flex max-w-sm  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg max-laptop:hidden    ' >
                <Link className=' bg-gray-950 px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font hover:bg-gray-900 transition-all  ' href={"/login"} >Get Started</Link>
            </div>
            <div className='hidden max-laptop:flex ' >
                <MenuIcon className="!text-[2.5rem]"  />
            </div>
        </nav>
    </div>
    </>
  )
}

export default Navbar