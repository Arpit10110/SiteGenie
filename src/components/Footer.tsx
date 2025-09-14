import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  return (
    <>
        <footer className='flex w-[80%] m-auto justify-between py-[2rem] px-[1rem] bg-[#ffffff08] mb-[4rem] items-center rounded-[10px] border-[1.5px] border-gray-800 ' > 
            <div>
                <h3 className='text-[1.5rem] text-gray-200 ' >© 2025  Design & Developed by Arpit Agrahari </h3> 
            </div>
            <div className='flex gap-[2rem] ' >
                <a href="">
                <FacebookIcon className='!text-[2rem] text-gray-200 hover:scale-[1.03] transition-all' />
                </a>
                <a href="">
                <InstagramIcon className='!text-[2rem] text-gray-200 hover:scale-[1.03] transition-all' />
                </a>
                <a href="">
                <XIcon className='!text-[2rem] text-gray-200 hover:scale-[1.03] transition-all' />
                </a>
                <a href="">
                <LinkedInIcon className='!text-[2rem] text-gray-200 hover:scale-[1.03] transition-all' />
                </a>
            </div>
        </footer>
    </>
  )
}

export default Footer