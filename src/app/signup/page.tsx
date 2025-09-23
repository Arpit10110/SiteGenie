"use client"
import SignUpForm from '@/components/SignUpForm'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
const Page = () => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const handleSubmit = async (name:string,email:string,password:string) => {
        try {
            setOpen(true)
            const response = await axios.post('/api/signup',{name,email,password})
            if(response.data.success){
                setOpen(false)
                router.push('/login')
            }else{
                setOpen(false)
                toast.error(response.data.message)
            }
        } catch (error) {
            setOpen(false)
            console.log(error)
            toast.error("Error in Signup Please try again")
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
     <div className='w-full h-[100vh] flex justify-center items-center ' >
        <div className='w-[50%] max-tablet:w-[80%] max-mobile:w-[90%] bg-black border-[1px] border-gray-700  p-[1rem] rounded-[5px] flex flex-col gap-[1.5rem] justify-center items-center' >
            <div className='w-full flex flex-col gap-[0.5rem] justify-center items-center ' >
                <h2 className='text-[2rem] text-gray-300 ' >Create your account</h2>
                <h3 className='text-[1.5rem] text-gray-300 ' >Welcome! Please fill in the details to get started.</h3>
            </div>
            <SignUpForm handlesumit={handleSubmit} />
            <div className='w-full  justify-between items-center flex' >
                <div className='w-[45%] h-[0.1vh] bg-gray-600 ' ></div>
                <h2 className='text-[1.5rem] text-gray-300 font-semibold ' >Or</h2>
                <div className='w-[45%] h-[0.1vh] bg-gray-600 ' ></div>
            </div>
            <button  className='w-[80%]  m-auto text-white bg-gray-800 text-[1.5rem] py-[0.3rem] cursor-pointer hover:scale-[1.02] font-semibold  transition-all rounded-[5px]' >Continue with Google</button>
            <Link href={"/login"} className=' text-blue-400 text-[1.5rem] underline ' > Already have an account? Sign in</Link>
        </div>
     </div>
     <ToastContainer />
    </>
  )
}

export default Page