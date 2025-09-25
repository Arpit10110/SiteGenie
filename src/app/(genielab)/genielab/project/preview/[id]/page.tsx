"use client"
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
        const params = useParams()
        const searchParams = useSearchParams() 
        const id = params?.id || searchParams.get('id')
        const [loading, setLoading] = useState<boolean>(true)
        const [combinedcode, setCombinedcode] = useState<string>("")
        

        const getproject = async (id: string) => {
            setLoading(true)
            try {
                const res = await axios.post(`/api/preview`, {
                    projectid: id
                }) 
                console.log(res.data)
                if (res.data.success) {
                    setCombinedcode(res.data.combinedcode|| "")
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        useEffect(() => {
            if (id && typeof id === 'string') {
                getproject(id)
            }
        }, [id])
  return (
   <>
   {
    loading?
    <div className='w-full h-[70vh] flex items-center justify-center'>
      <div className='text-white text-xl'>Loading project...</div>
    </div>
    :
            <iframe 
                srcDoc={combinedcode}
                className="w-full min-h-[100vh] "
                title="Code Preview"
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
            />
   }
   </>
  )
}

export default Page