import React from 'react'
import Stack from './ui/Stack'

const Section5 = () => {
  return (
    <>
        <div className='w-full  my-[8rem] max-tablet:my-[4rem] ' >
            <div className='mb-[4rem] flex flex-col gap-[1rem] items-center justify-center ' >
                <div data-aos="fade-up" data-aos-duration="3000" data-aos-delay="50"  className='flex  w-fit max-w-sm  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg  '>
                <h2 className=' bg-gray-950 px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font hover:bg-gray-900 transition-all  '   >Next-Gen AI</h2>
                </div>
                <h1 data-aos="fade-up" data-aos-duration="3000" data-aos-delay="100" className='text-[4rem]' >Build Smarter, Not Harder</h1>
                <p data-aos="fade-up"data-aos-duration="3000" data-aos-delay="150" className='text-[2rem] text-center w-[50%] text-gray-300 max-tablet:w-[80%] ' >
                GenieLab helps you design beautiful, responsive websites in minutes. With clean code, smart styling, and instant previews ,  you focus on ideas while the AI takes care of the heavy lifting.
                </p>
            </div>
            <Stack/>
        </div>
    </>
  )
}

export default Section5