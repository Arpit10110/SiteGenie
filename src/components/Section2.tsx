import React from 'react'
import Chathomeui from './ui/Chathomeui'
import Section2Image from "@/assets/section2Image.png"
import Image from 'next/image'
import Section2Background from "@/assets/section2-background.png"
const Section2 = () => {
  return (
    <>
        <div className='relative z-[5] w-full ' >
            <Chathomeui/>
            <div className='absolute top-[7rem] w-full flex justify-center items-center z-[-5] '  >
                 <Image className=' w-[80%]  '  src={Section2Image} alt='Image' />
            </div>
            <div className='absolute top-[3rem] w-full flex justify-center items-center z-[-8] ' >
                 <Image className=' w-[100%] h-[100vh] '  src={Section2Background} alt='Image' />
            </div>
        </div>
    </>
  )
}

export default Section2

