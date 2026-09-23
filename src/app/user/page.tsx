"use client"
import React, { useEffect, useState } from 'react'
import "./user.css"
import Counter from '@/components/Counter'
interface userdata_type{
  id:number
  name:string 
  company:{
    name:string
  }
  address:{
    geo:{
      lat:string
      lng:string
    }
  }
 
}
const page = () => {
  const [data,setdata]= useState<userdata_type[]>([])
  const [Loading,setLoading]= useState(true);
  const [counter,setCounter] = useState(0)
  const getuser = async()=>{
    try {
      const res =  fetch("https://jsonplaceholder.typicode.com/users").then(async(data)=>{
        const user_data:userdata_type[] = await data.json()
        console.log(user_data)
        const filteredUsers = user_data.filter(user => user.name.includes("B"))
      console.log('Filtered users:', filteredUsers)
        setdata(filteredUsers);
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
   getuser()
  }, [])
  
  return (
    <>
    {
      Loading ? 
      <h1>Loading...</h1>:
      <>
      <div>
      <Counter counter={counter} setCounter={setCounter} />
      </div>
        <div className='user_wrapper' >
          {
            data.map((i:userdata_type)=>{
                return(
                  <div className='user_box' key={i.id} >
                    <h4>Name:- {i.name}</h4>
                    <div className='user_adress' >
                      <h5>Latitude:-{i.address.geo.lat}</h5>
                      <h5>Longitiude{i.address.geo.lng}</h5>
                    </div>
                    <h4>Company:- {i.company.name}</h4>
                  </div>
                )
            })
          }
        </div>
      </>
    }
    </>
  )
}

export default page