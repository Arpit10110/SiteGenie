"use client"
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {signOut} from "next-auth/react"
interface User {
    id: string;
    name: string;
    email: string;
}
interface projectstype{
    projectid:string;
    projectname:string;

}
const Userprofile = () => {

    const [userdata,setuserdata] = useState<User>({
        id:'',
        name:'',
        email:''
    })
    const [open, setOpen] = React.useState(false);

    const [projects,setprojects] = useState<projectstype[]>([])
    const [Token,SetToken] = useState<number>(0)
    const getuserdata = async()=>{
        try {
            setOpen(true)
            const res= await axios.get('/api/getuserprofile')
            console.log(res.data)
            setuserdata(res.data.user_data)
            setprojects(res.data.userprojects)
            SetToken(res.data.token)
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogOut = async()=>{
        try {
            setOpen(true);
            await signOut({ redirect: true,redirectTo:"/" }); 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getuserdata()
    }, [])
    
  return (
    <>
          <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
          <div className='w-full mt-[4rem] flex flex-col gap-[2.5rem] ' >
             <div className='flex max-mobile:w-[95%]   w-[90%] m-auto  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg  '>
                  <div className=' bg-black w-full px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font  transition-all  '   >
                    <div className='flex flex-col gap-[1rem] py-[1rem]' >
                        <h2>Name: {userdata.name}</h2>
                        <h2>Email: {userdata.email}</h2>
                        <div className='flex gap-[1rem]' >
                            <button onClick={handleLogOut} className='text-[1.5rem] bg-gray-800 px-[1rem] py-[0.3rem] rounded-[7px]  cursor-pointer hover:scale-[1.03] transition-all ' >Logout</button>
                            <button className='text-[1.5rem] bg-gray-800 px-[1rem] py-[0.3rem] rounded-[7px] cursor-pointer hover:scale-[1.03] transition-all ' >Edit Profile</button>
                        </div>
                    </div>
                  </div>
              </div>
             <div className='flex max-mobile:w-[95%]  w-[90%] m-auto  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg  '>
                  <div className=' bg-black w-full px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font  transition-all  '   >
                    <div className='flex flex-col gap-[1rem] py-[1rem]' >
                      <h2>Your have  <span className='text-[#de692e] font-semibold' >{Token}</span> tokens. <Link className='underline text-blue-400 ' href={"/pricing"} >Buy More</Link> </h2>
                    </div>
                  </div>
              </div>
             <div className='flex max-mobile:w-[95%]  w-[90%] m-auto  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg  '>
                  <div className=' bg-black w-full px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font  transition-all  '   >
                    <div className='flex flex-col gap-[1rem] py-[1rem] w-full' >
                      <h2>Your Projects</h2>
                      <div className='w-full' >
                            {
                                projects.length>0?
                                projects.map((project,index)=>{
                                    return(
                                        <div key={index} className='flex gap-[1rem] py-[0.3rem] items-center justify-between px-[1rem] rounded-[5px] bg-gray-900 w-full' > 
                                            <h2>{index+1}.{project.projectname}</h2>
                                            <Link href={`/genielab/project/${project.projectid}`} className='text-[1.5rem]  px-[1rem] py-[0.3rem] rounded-[7px]  cursor-pointer hover:scale-[1.03] transition-all bg-black ' >Open Project</Link>
                                        </div>
                                    )
                                })
                                :
                                <h2 className='text-gray-300 text-[1.5rem]'>
                                You have not created any projects yet. <Link className='text-blue-500 underline' href={"/genielab"}>Create Now</Link>
                              </h2>
                              
                            }
                      </div>
                    </div>
                  </div>
              </div>
          </div>
    </>
  )
}

export default Userprofile