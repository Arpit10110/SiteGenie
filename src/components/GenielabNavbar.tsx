"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from "@/assets/logo.png"
import Link from 'next/link'
import { redirect } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
type User = {
    id: string;
    name: string;
    email: string;
  };;
const GenielabNavbar = ({user}:{user:User|null}) => {
         const [open, setOpen] = useState(false);
          const toggleDrawer = (newOpen: boolean) => () => {
            setOpen(newOpen);
          };
    if(user==null){
        redirect('/login')
    }
  return (
    <>
         <div className='w-full flex justify-center items-center ' >
                <nav  className=' backdrop-blur-[10px] flex justify-between  items-center w-[100%] p-[2rem]  ' >
                    <div className='flex  items-center gap-[0.5rem] w-[20%]   ' >
                        <Image className='w-[12%]' src={logo} alt='SiteGenie' />
                        <Link href={"/"} className='robot-font text-[2.5rem]  ' >SiteGenie</Link>
                    </div>
                    <div className='flex items-center  gap-[3rem] min-w-[38%] max-laptop:hidden  ' > 
                        <Link className='text-[1.5rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/"} >Home</Link>
                        <Link className='text-[1.5rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/pricing"} >Pricing</Link>
                        <Link className='text-[1.5rem] robot-font hover:scale-[1.03] transition-all text-gray-300 hover:text-white font-medium '  href={"/genielab"} >GenieLab</Link>
                    </div>
                    <div className='flex max-w-sm  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg max-laptop:hidden    ' >
                {
                    user == null ? 
                    <Link className=' bg-gray-950 px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font hover:bg-gray-900 transition-all  ' href={"/login"} >Get Started</Link>:
                    <Link className=' bg-gray-950 px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font hover:bg-gray-900 transition-all  ' href={"/profile"} >Profile</Link>
                }
            </div>
            <div className='hidden max-laptop:flex ' onClick={()=>setOpen(true)} >
                <MenuIcon className="!text-[2.5rem]"  />
            </div>
                </nav>
                <Drawer  open={open} anchor='right'  onClose={toggleDrawer(false)}>
                                <div className='w-full h-full bg-[#000000d6] flex flex-col gap-[3rem]  p-[3rem] pt-[8rem] justify-normal font-semibold text-[2rem] ' >
                                    <Link className='hover:scale-[1.03] transition-all text-white' onClick={()=>setOpen(false)}  href={"/"} prefetch>Home</Link>
                                    <Link className='hover:scale-[1.03] transition-all text-white' onClick={()=>setOpen(false)}    href={"/pricing"} prefetch>Pricing</Link>
                                    <Link className='hover:scale-[1.03] transition-all text-white' onClick={()=>setOpen(false)}    href={"/genielab"} prefetch>GenieLab</Link>
                                    {
                                    user==null?
                                        <Link  className='bg-gray-600 text-white rounded-[10px] px-[1rem] py-[0.3rem] flex items-center hover:scale-[1.03] transition-all  ' onClick={()=>setOpen(false)}    href={"/login"} prefetch>LogIn</Link>:
                                        <Link className='bg-orange-600 text-white rounded-[10px] px-[1rem] py-[0.3rem] flex items-center hover:scale-[1.03] transition-all  ' onClick={()=>setOpen(false)}   href={"/profile"} >Profile</Link>
                                    }
                                </div>
                        </Drawer>
            </div>
    </>
  )
}

export default GenielabNavbar