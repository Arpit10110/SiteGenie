import React from 'react'

const SideAiChat = () => {
  return (
    <>
        <div className='w-[99%] h-full bg-[#ffffff0f] rounded-[3px] '  >
            <div className='w-full h-[80%] overflow-y-scroll hide-scrollbar ' > 
            </div>
            <div className='w-full h-[20%] flex ' >
                <textarea  className='hide-scrollbar bg-black w-[95%] m-auto h-[80%]  rounded-[7px] px-[0.5rem] py-[0.5rem] text-[1.5rem] outline-hidden ' placeholder='Ask SiteGenie...' />
            </div>
        </div>
    </>
  )
}

export default SideAiChat