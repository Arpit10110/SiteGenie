"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const Page = () => {
  const router = useRouter()
  const [userprompt, Setuserprompt] =useState('')
  const handleSubmit = async() => {
   try {
      const res = await axios.post("/api/askai",{
        userquery:userprompt
      })
      console.log(res.data)
      if(res.data.success){
        router.push(`/genielab/project/${res.data.chatid}`)
      }
   } catch (error) {
    console.log(error)
   }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() 
      if(userprompt.length>0){
        handleSubmit()
      }else{
        alert('Please enter a prompt')
      }
    }
  }
  return (
    <>
        <div  className='w-full flex mt-[5rem] justify-center items-center  ' >
            <div className=' flex flex-col w-full justify-center items-center gap-[4rem] '  >  
                <div className='flex flex-col justify-center items-center ' >
                    <h2 className='text-[3rem] font-semibold max-mobile:text-[2rem] text-center' >Build something 💞 with SiteGenie</h2>
                    <h3 className='text-[2rem] text-gray-300  max-mobile:text-[1.5rem] text-center ' >Create websites by chatting with AI</h3>
                </div>
                <div className='bg-[#ffffff0f] px-[2rem] py-[1rem] rounded-[1rem] w-[60%] max-tablet:w-[80%] max-mobile:w-[90%]  border-[1px] border-gray-700' >
                  <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{
                    e.preventDefault()
                    handleSubmit()
                  }} className='flex flex-col gap-[1rem] ' >
                     <textarea  onKeyDown={handleKeyDown} className='w-full bg-transparent outline-none resize-none h-[6rem] text-[1.5rem] overflow-y-auto hide-scrollbar' value={userprompt}  onChange={(e)=>Setuserprompt(e.target.value)} placeholder='Create a website for my new startup that sells eco-friendly products.'  required></textarea>
                     <div className='flex w-full justify-between items-center ' >
                       <div className='w-fit flex gap-[2rem] text-[1.5rem]  max-mobile:hidden ' > 
                          <h2 onClick={()=>Setuserprompt('Create a Todo Website')} className='border-[1px] border-gray-700 rounded-[1rem] px-[1rem] py-[0.5rem] text-[1.5rem] font-semibold bg-black cursor-pointer '>Create a Todo List</h2>
                          <h2 onClick={()=>Setuserprompt('Create a Calculator Website')} className='border-[1px] border-gray-700 rounded-[1rem] px-[1rem] py-[0.5rem] text-[1.5rem] font-semibold bg-black cursor-pointer '>Create a Calculator</h2>
                       </div>
                       <button type='submit' className='cursor-pointer bg-black text-[1.5rem] rounded-[1rem] px-[1rem] py-[0.5rem] text-white font-semibold border-[1px] border-gray-700 '>
                        Start Building
                       </button>
                     </div>
                     </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Page