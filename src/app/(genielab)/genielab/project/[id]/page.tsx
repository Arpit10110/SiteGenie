import CodeBox from '@/components/CodeBox'
import SideAiChat from '@/components/SideAiChat'
import React from 'react'

const page = () => {
  return (
    <>
        <div className='w-full h-[85vh] overflow-y-hidden flex  ' >
          <div className='w-[35%] h-full flex justify-end ' >
            <SideAiChat/>
          </div>
          <div className='w-[65%] h-full px-[1rem] ' >
            <div className='w-full flex gap-[1.5rem] ' >
              <button className='bg-black text-[1.4rem] rounded-[1rem] px-[1rem] py-[0.3rem] text-white cursor-pointer border-[1px] border-gray-700 '>Code</button>
              <button className='bg-black text-[1.4rem] rounded-[1rem] px-[1rem] py-[0.3rem] text-white cursor-pointer   border-[1px] border-gray-700 '>Preview</button>
            </div>
            <div className='w-full h-[95%] mt-[1rem]' >
              <CodeBox/>
            </div>
          </div>
        </div>
    </>
  )
}

export default page