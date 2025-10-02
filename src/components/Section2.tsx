import React from 'react'
import Chathomeui from './ui/Chathomeui'
import Section2Image from "@/assets/section2Image.png"
import Image from 'next/image'
import Section2Background from "@/assets/section2-background.png"
const Section2 = () => {
  return (
    <>
        <div className='relative z-[5] w-full  min-h-[100vh] max-tablet:min-h-fit ' >
            <Chathomeui/>
            <div className='absolute top-[7rem] w-full flex justify-center items-center z-[-5] max-tablet:hidden '  >
                 <Image className=' w-[80%]  '  src={Section2Image} alt='Image' />
            </div>
            <div className='absolute top-[3rem] w-full flex justify-center max-smobile:h-[20vh]  items-center z-[-8] max-tablet:top-[0rem] ' >
                 <Image className=' w-[100%] h-[100vh] max-tablet:h-[35vh]  max-smobile:h-full  '  src={Section2Background} alt='Image' />
            </div>
        </div>
    </>
  )
}

export default Section2

