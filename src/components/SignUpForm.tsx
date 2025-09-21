"use client"
import React from 'react'
interface SignUpFormProps {
    handlesumit: (name: string, email: string, password: string) => void;
  }
  
const SignUpForm = ({ handlesumit }: SignUpFormProps) => {
    const [name, setName] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const handleform = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handlesumit(name,email,password)
    }
  return (
  <>
    <form onSubmit={handleform}  className='w-full flex flex-col gap-[2rem] justify-center items-center ' >
         <div className=' flex flex-col gap-[1rem] w-full  ' >
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='w-full bg-white text-black text-[1.5rem] py-[0.3rem] px-[1rem] rounded-[5px] '  placeholder='Enter your name'required/>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full bg-white text-black text-[1.5rem] py-[0.3rem] px-[1rem] rounded-[5px] '  placeholder='Enter your email'required/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full bg-white text-black text-[1.5rem] py-[0.3rem] px-[1rem] rounded-[5px] '  placeholder='Enter your password'required/>
         </div>
         <button  className='w-[80%]  m-auto text-white bg-gray-800 text-[1.5rem] py-[0.3rem] cursor-pointer hover:scale-[1.02] font-semibold  transition-all rounded-[5px]' >Sign Up</button>
    </form>
  </>
  )
}

export default SignUpForm