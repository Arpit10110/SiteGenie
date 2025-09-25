import React from 'react'
import { getuser } from '@/lib/getuser'
import { redirect } from 'next/navigation'
import Userprofile from '@/components/Userprofile'
const page = async() => {
    const user = await getuser()
    if(user == null){
        redirect("/login")
    }


  return (
    <> 
        <div>
            <Userprofile/>
        </div>
    </>
  )
}

export default page