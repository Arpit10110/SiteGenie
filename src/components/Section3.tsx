import React from 'react'
import Marquee from "react-fast-marquee";
const Section3 = () => {
    const marqueeItems: string[] = [
        "📝 Todo App",
        "🧮 Calculator",
        "📒 Notes App",
        "📱 Responsive Layouts",
        "🎯 Quiz Game",
        "⚡ Instant Preview",
        "💾 LocalStorage Ready",
        "⏱️ Stopwatch",
      ];
      
  return (
    <>
        <div className='my-[8rem]' >
            <h2 className='text-[3rem] text-center text-gray-300 ' >Bring Ideas to Life in Seconds</h2>
            <div className='mt-[5rem] cursor-default ' >
                <Marquee>
                    {marqueeItems.map((item, index) => (
                        <h2 key={index} className="text-[2.5rem] ml-[6rem] text-gray-400 ">
                        {item}
                        </h2>
                    ))}
                </Marquee>
            </div>
        </div>
    </>
  )
}

export default Section3