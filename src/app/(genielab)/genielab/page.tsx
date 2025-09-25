"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import SavedProjects from '@/components/SavedProjects'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Page = () => {
  const router = useRouter()
  const [userprompt, Setuserprompt] =useState('')
  const [savedprojects, Setsavedprojects] = useState([])
  const [open, setOpen] = React.useState(false);


  const handleSubmit = async() => {
   try {
    setOpen(true)
      const res = await axios.post("/api/askai",{
        userquery:userprompt
      })
      if(res.data.success){
        router.push(`/genielab/project/${res.data.chatid}`)
      }else{
        setOpen(false)
        console.log(res.data)
      }
   } catch (error) {
    console.log(error)
    setOpen(false)
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

  const getuserprojects = async()=>{
    try {
      setOpen(true)
      const res = await axios.get("/api/getuserprojects")
      Setsavedprojects(res.data.projects)
      console.log(res.data)
      setOpen(false)
    } catch (error) {
      console.log(error)
      setOpen(false)
    }
  }


  useEffect(() => {
    getuserprojects()
  }, [])

  return (
    <>
      <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
        <div  className='w-full flex mt-[5rem] justify-center items-center flex-col ' >
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
            <div className='w-full  mt-[5rem]   ' >
              <h2 className='text-[2rem] font-semibold text-gray-300 ml-[3rem] underline cursor-default ' >Saved Projects</h2>
              <SavedProjects  savedprojects={savedprojects} />
            </div>
    </>
  )
}

export default Page