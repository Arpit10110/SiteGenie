"use client"
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'
import CodeBox from '@/components/CodeBox'
import SideAiChat from '@/components/SideAiChat'
import React from 'react'
import Codepreview from '@/components/Codepreview'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
const Page = () => { 
    const params = useParams()
    const searchParams = useSearchParams() 
    const id = params?.id || searchParams.get('id')
    
    const [htmlcontent, setHtmlContent] = useState<string>("")
    const [csscontent, setCssContent] = useState<string>("")
    const [jscontent, setJsContent] = useState<string>("")
    const [codeview, setCodeview] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [combinedcode, setCombinedcode] = useState<string>("")
    const [projectName, setProjectName] = useState<string>("MyProject")
    const getproject = async (id: string) => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/getproject`, {
                projectid: id
            }) 
            console.log(res.data)
            if (res.data.success) {
                setHtmlContent(res.data.project.html || "")
                setCssContent(res.data.project.css || "")
                setJsContent(res.data.project.js || "")
                setCombinedcode(res.data.project.combined || "")
                setProjectName(res.data.project.project_name || "MyProject")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const downloadFiles = async () => {
      try {
          const zip = new JSZip()
          zip.file("index.html", htmlcontent)
          zip.file("styles.css", csscontent)
          zip.file("script.js", jscontent)
          const content = await zip.generateAsync({ type: "blob" })
          saveAs(content, `${projectName}.zip`)
      } catch (error) {
          console.error("Error creating ZIP file:", error)
          alert("Error downloading files. Please try again.")
      }
  }

  const openInNewTab = () => {
    try {
        const blob = new Blob([combinedcode], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const newWindow = window.open(url, '_blank')
        setTimeout(() => {
            URL.revokeObjectURL(url)
        }, 1000)
        if (newWindow) {
            newWindow.focus()
        }
    } catch (error) {
        console.error("Error opening in new tab:", error)
        alert("Error opening in new tab. Please try again.")
    }
}



    useEffect(() => {
        if (id && typeof id === 'string') {
            getproject(id)
        }
    }, [id])

    if (loading) {
        return (
            <div className='w-full h-[85vh] flex items-center justify-center'>
                <div className='text-white text-xl'>Loading project...</div>
            </div>
        )
    }

    return (
        <>
            <div className='w-full h-[85vh] overflow-y-hidden flex'>
                <div className='w-[35%] h-full flex justify-end'>
                    <SideAiChat/>
                </div>
                <div className='w-[65%] h-full px-[1rem]'>
                    <div className='w-full flex justify-between items-center  ' >
                      <div className="flex gap-[1.5rem] py-[1rem]" >
                        <button 
                            onClick={() => setCodeview(true)} 
                            className={`text-[1.4rem] rounded-[1rem] px-[1rem] py-[0.3rem] text-white cursor-pointer border-[1px] border-gray-700 transition-colors ${
                                codeview ? "bg-gray-700" : "bg-black hover:bg-gray-800"
                            }`}
                        >
                            Code
                        </button>
                        <button 
                            onClick={() => setCodeview(false)} 
                            className={`text-[1.4rem] rounded-[1rem] px-[1rem] py-[0.3rem] text-white cursor-pointer border-[1px] border-gray-700 transition-colors ${
                                !codeview ? "bg-gray-700" : "bg-black hover:bg-gray-800"
                            }`}
                        >
                            Preview
                        </button>
                      </div>
                      <div className="flex gap-[1.5rem] py-[1rem]" >
                        <button onClick={downloadFiles}  className='text-[1.4rem] rounded-[1rem] px-[1rem] py-[0.3rem] text-white cursor-pointer border-[1px] border-gray-700 transition-colors '>Download </button>
                        <button onClick={openInNewTab} className='text-[1.4rem] rounded-[1rem] px-[1rem] py-[0.3rem] text-white cursor-pointer border-[1px] border-gray-700 transition-colors '>Open in new tab</button>
                      </div>
                    </div>
                    <div className='w-full flex-1' style={{ height: 'calc(100% - 4rem)' }}>
                        {codeview ? (
                            <CodeBox 
                                htmlcontent={htmlcontent} 
                                csscontent={csscontent} 
                                jscontent={jscontent}
                            />
                        ) : (
                            <Codepreview 
                            combinedcode={combinedcode}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
