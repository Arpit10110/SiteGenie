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
import Link from 'next/link'


interface chattype{
    messaged_by:string,
    message:string,
    createdAt:string
    project_id:string
    _id:string
    user_id:string
}


interface updatedProject{
    html:string,
    css:string,
    js:string,
    combined:string,
    project_name:string,
    user_id:string
}


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
    const [oldchats, setOldchats] = useState<chattype[]>([])
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null)


    // Check if device is desktop
    useEffect(() => {
        const checkDevice = () => {
            const userAgent = navigator.userAgent.toLowerCase()
            const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent)
            const isSmallScreen = window.innerWidth < 1024 // Below 1024px is considered mobile/tablet
            
            setIsDesktop(!isMobileDevice && !isSmallScreen)
        }

        checkDevice()

        // Also check on window resize
        const handleResize = () => {
            const isSmallScreen = window.innerWidth < 1024
            if (isSmallScreen) {
                setIsDesktop(false)
            } else {
                const userAgent = navigator.userAgent.toLowerCase()
                const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent)
                setIsDesktop(!isMobileDevice)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    const getproject = async (id: string) => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/getproject`, {
                projectid: id
            }) 
            console.log(res.data)
            if (res.data.success) {
                setOldchats(res.data.chats)
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


    // Handle project updates from chat
    const handleProjectUpdate = (updatedProject: updatedProject) => {
        setHtmlContent(updatedProject.html)
        setCssContent(updatedProject.css)
        setJsContent(updatedProject.js)
        setCombinedcode(updatedProject.combined)
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


    useEffect(() => {
        if (id && typeof id === 'string') {
            getproject(id)
        }
    }, [id])


    // Show loading while checking device type
    if (isDesktop === null) {
        return (
            <div className='w-full h-[85vh] flex items-center justify-center'>
                <div className='text-white text-xl'>Loading...</div>
            </div>
        )
    }


    // Show message for mobile/tablet users
    if (!isDesktop) {
        return (
            <div className='w-full h-[85vh] flex items-center justify-center px-[2rem]'>
                <div className='text-center'>
                    <h1 className='text-white text-3xl font-bold mb-4'>Desktop Only</h1>
                    <p className='text-gray-400 text-lg'>
                        This page is only accessible on laptop/desktop devices. 
                        Please open this page on a larger screen for the best experience.
                    </p>
                </div>
            </div>
        )
    }


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
                    <SideAiChat 
                        project_id={id}
                        oldchat={oldchats} 
                        onProjectUpdate={handleProjectUpdate}
                    />
                </div>
                <div className='w-[65%] h-full px-[1rem]'>
                    <div className='w-full flex justify-between items-center'>
                        <div className="flex gap-[1.5rem] py-[1rem]">
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
                        <div className="flex gap-[1.5rem] py-[1rem]">
                            <button 
                                onClick={downloadFiles}  
                                className='text-[1.4rem] rounded-[1rem] px-[1rem] py-[0.3rem] text-white cursor-pointer border-[1px] border-gray-700 transition-colors hover:bg-gray-800'
                            >
                                Download
                            </button>
                            <Link 
                                target='_blank'
                                href={`/genielab/project/preview/${id}`}
                                className='text-[1.4rem] rounded-[1rem] px-[1rem] py-[0.3rem] text-white cursor-pointer border-[1px] border-gray-700 transition-colors hover:bg-gray-800'
                            >
                                Open in new tab
                            </Link>
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
