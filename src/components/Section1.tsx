'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import SplitText from './ui/SplitText'
import AOS from 'aos';
import 'aos/dist/aos.css';
const Section1 = () => {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  useEffect(()=>{
    AOS.init();
  },[])
  return (
    <>
        <div className=' w-full  ' >
            <div className='min-h-[100vh]  max-smobile:min-h-[90vh]  max-w-[50%]  max-tablet:max-w-[90%] max-tablet:m-auto   max-tablet:items-center  flex flex-col gap-[1rem] max-tablet:gap-[2rem] justify-center  pl-[4rem] max-tablet:pl-[0rem] ' >
              <div className='flex  w-fit max-w-sm  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg  '>
                  <h2 className=' bg-gray-950 px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font hover:bg-gray-900 transition-all  '   >AI-Powered Website Builder</h2>
              </div>
              <div className='w-[100%] flex flex-col gap-[0.5rem]  max-tablet:gap-[2rem] ' >
                <SplitText
                text="Turn Your Ideas Into Stunning Websites Instantly"
                className="text-[4rem] robot-font font-bold !text-start max-tablet:flex max-tablet:justify-center max-tablet:gap-[1rem] max-tablet:flex-wrap max-smobile:text-[3rem] "
                delay={50}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
                />
                <p data-aos="fade-up" data-aos-duration="1000"  data-aos-delay="300"   data-aos-easing="linear" className='text-[2rem] robot-font text-gray-300 font-medium max-tablet:text-center  '>
                Describe what you want and GenieLab instantly builds it. Preview, edit, and launch in seconds.
                </p>
              </div>
              <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400"  data-aos-easing="linear" className='flex w-full gap-[2rem] mt-[1rem] flex-wrap max-tablet:justify-center max-tablet:items-center  ' >
                <div className='flex  w-fit max-w-[100%] max-smobile:w-[80%]  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg  hover:scale-[1.03] transition-all    '>
                  <Link  className=' bg-gray-950 px-[1rem] py-[0.3rem] max-smobile:w-[100%]  max-smobile:flex max-smobile:justify-center  flex rounded-[10px]  text-[2rem] robot-font'  href={"/genielab"}>Get Started - Free</Link>
                </div>
                <Link  className=' bg-gray-950 border-[1px] border-gray-100  px-[1rem] py-[0.3rem] flex rounded-[10px] hover:scale-[1.03]   text-[2rem] robot-font  transition-all max-smobile:w-[80%] max-smobile:flex max-smobile:justify-center' href={"/pricing"}>View Pricing</Link>
              </div>
            </div>
            <video className='absolute right-0 w-[80%] z-[-5] top-0 max-tablet:w-full max-tablet:h-full object-cover ' src="/sec1video.mp4" loop={true} autoPlay={true} muted={true}  ></video>
        </div>
    </>
  )
}

export default Section1