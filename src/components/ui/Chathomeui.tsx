import Link from 'next/link';
import React from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TypingAnimation from './TypingAnimation';
const Chathomeui = () => {
  return (
   <>
   <div  className='flex justify-center items w-full ' >
        <div  className='w-[50%] flex  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-[0.25rem] shadow-lg  ' >
            <div className='w-[100%] bg-black px-[1rem] py-[2rem] rounded-[10px]  text-[1.5rem] robot-font flex flex-col gap-[3rem]   ' >
                <div>
                <TypingAnimation/>
                </div>
                <div className='flex justify-between  items-center ' >
                    <div className='flex  gap-[2rem] ' >
                        <button className=' bg-black border-[0.5px] border-gray-400  px-[0.5rem] py-[0.3rem] flex rounded-[10px] hover:scale-[1.03]   text-[1.5rem] robot-font  transition-all  '>Todo Website</button>
                        <button className=' bg-black border-[0.5px] border-gray-400  px-[0.5rem] py-[0.3rem] flex rounded-[10px] hover:scale-[1.03]   text-[1.5rem] robot-font  transition-all  '>Calculator Website</button>
                    </div>
                    <div className='flex items-center justify-center  w-fit max-w-sm  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg  hover:scale-[1.03] transition-all    ' >
                        <Link href={"/genielab"} className=' bg-black px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font flex items-center gap-[0.5rem] ' > <AutoAwesomeIcon/> Start Creating</Link>
                    </div>
                </div>
            </div>
        </div>
   </div>
   </>
  )
}

export default Chathomeui;