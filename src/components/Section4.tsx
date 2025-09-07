"use client"
import React, { useEffect } from 'react'
import htmlimage from "@/assets/html-image.png"
import cssimage from "@/assets/css-image.png"
import jsimage from "@/assets/js-image.png"
import previewimage from "@/assets/preview-image.png"
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
interface featuretype{
    title:string
    description:string
    image:StaticImageData,
    window_width:string
}
const Section4 = () => {

    const features: featuretype[] = [
        {
          title: "Clean HTML",
          description:
            "Structure your pages with semantic and organized markup that ensures better readability, accessibility, and long-term maintainability for any project.",
          image: htmlimage,
          window_width:"35%"
        },
        {
          title: "CSS Styling",
          description:
            "Design visually stunning, responsive layouts with sleek CSS styling that adapts to every device, giving your website a professional and modern feel.",
          image: cssimage,
          window_width:"60%"

        },
        {
          title: "Powerful JavaScript",
          description:
            "Enhance your site with smooth interactivity, dynamic animations, and advanced functionality powered by JavaScript, making your projects come alive.",
          image: jsimage,
          window_width:"60%"

        },
        {
          title: "Live Preview",
          description:
            "See every change reflected instantly with real-time previews, so you can experiment freely, refine designs quickly, and build with confidence.",
          image: previewimage,
          window_width:"35%"

        },
      ]


      const widthClass: Record<string, string> = {
        '35%': 'w-[35%]',
        '60%': 'w-[60%]',
      };
      
 useEffect(()=>{
    AOS.init();
  },[])



  return (
    <>
        <div>
            <div className='my-[5rem] flex flex-col gap-[1rem] items-center justify-center ' >
                <div data-aos="fade-up" data-aos-duration="3000" data-aos-delay="50"  className='flex  w-fit max-w-sm  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg  '>
                    <h2 className=' bg-gray-950 px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font hover:bg-gray-900 transition-all  '   >AI-Powered Website Builder</h2>
                </div>

                <h1 data-aos="fade-up" data-aos-duration="3000" data-aos-delay="100" className='text-[4rem]' >Seamless Web Creation</h1>
                <p data-aos="fade-up"data-aos-duration="3000" data-aos-delay="150" className='text-[2rem] text-center w-[50%] text-gray-300 ' >
                GenieLab lets you craft beautiful websites with clean HTML, stylish CSS, and powerful JavaScript — all synced in real time with instant previews. Build faster, smarter, and without the usual setup hassle.
                </p>
            </div>
            <div className='flex flex-wrap justify-around gap-y-[5rem] ' >
                {
                    features.map((i,index)=>{
                        return (
                            <div data-aos="flip-left" data-aos-duration="3000"  className={` ${widthClass[i.window_width]} border-[0.5px] border-gray-700 flex flex-col gap-[1rem] py-[2rem] px-[2rem] rounded-[10px] `}  key={index} >
                                <Image src={i.image} alt='Image' className='w-[100%] h-[50vh] object-cover rounded-[10px]   ' />
                                <h2 className='text-[3rem]  ' >{i.title}</h2>
                                <p className='text-[1.5rem] text-gray-400  ' > 
                                    {i.description}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export default Section4