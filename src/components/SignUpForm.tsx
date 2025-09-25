"use client"
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import React from 'react'

const SignUpForm = () => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
             e.preventDefault()
            try {
                setOpen(true)
                const response = await axios.post('/api/signup',{name,email,password})
                if(response.data.success){
                    setOpen(false)
                    router.push('/login')
                }else{
                    setOpen(false)
                    toast.error(response.data.message,{theme:"dark"})
                }
            } catch (error) {
                setOpen(false)
                console.log(error)
                toast.error("Error in Signup Please try again",{theme:"dark"})
            }
    }
    
  return (
  <>
   <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <form onSubmit={handleSubmit}  className='w-full flex flex-col gap-[2rem] justify-center items-center ' >
         <div className=' flex flex-col gap-[1rem] w-full  ' >
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='w-full bg-white text-black text-[1.5rem] py-[0.3rem] px-[1rem] rounded-[5px] '  placeholder='Enter your name'required/>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full bg-white text-black text-[1.5rem] py-[0.3rem] px-[1rem] rounded-[5px] '  placeholder='Enter your email'required/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full bg-white text-black text-[1.5rem] py-[0.3rem] px-[1rem] rounded-[5px] '  placeholder='Enter your password'required/>
         </div>
         <button  className='w-[80%]  m-auto text-white bg-gray-800 text-[1.5rem] py-[0.3rem] cursor-pointer hover:scale-[1.02] font-semibold  transition-all rounded-[5px]' >Sign Up</button>
    </form>
    <ToastContainer />

  </>
  )
}

export default SignUpForm