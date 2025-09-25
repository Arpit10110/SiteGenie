"use client"
import axios from 'axios'
import React, { useEffect, useRef } from 'react'

interface updatedProject{
    html:string,
    css:string,
    js:string,
    combined:string,
    project_name:string,
    user_id:string
}
interface chattype{
    messaged_by:string,
    message:string,
    createdAt:string
    project_id:string
    _id:string
    user_id:string
}

const SideAiChat = ({project_id, oldchat, onProjectUpdate }: { 
    project_id: string | string[] | null,
    oldchat: chattype[], 
    onProjectUpdate: (updatedProject: updatedProject) => void 
}) => {
    const [chat, setChat] = React.useState<{ messaged_by: string; message: string; createdAt?: string }[]>([])
    const [newmessage, setNewmessage] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    // Initialize chat with old messages
    useEffect(() => {
        if (oldchat && oldchat.length > 0) {
            setChat(oldchat)
        }
    }, [oldchat])

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [chat])

    const customizeproject = async () => {
        if (!newmessage.trim() || isLoading) return;
        
        setIsLoading(true);
        
        // Add user message immediately to UI
        const userMsg = {
            messaged_by: "user",
            message: newmessage,
            createdAt: new Date().toISOString()
        };
        
        setChat(prev => [...prev, userMsg]);
        setNewmessage("");
        
        // Add loading indicator for AI response
        const loadingMsg = {
            messaged_by: "ai",
            message: "🤔 Thinking...",
            createdAt: new Date().toISOString()
        };
        
        setChat(prev => [...prev, loadingMsg]);

        try {
            const res = await axios.post("/api/customizeproject", {
                project_id,
                chat:chat,
                usermessage:newmessage
            });
            console.log(res.data)

            if (res.data.success) {
                setChat(prev => {
                    const newChat = prev.slice(0, -1);
                    return [...newChat, {
                        messaged_by: "ai",
                        message: res.data.parsed.message,
                        createdAt: new Date().toISOString()
                    }];
                });
                onProjectUpdate(res.data.parsed);
            }
        } catch (error) {
            console.error('Error customizing project:', error);
            
            // Replace loading message with error message
            setChat(prev => {
                const newChat = prev.slice(0, -1);
                return [...newChat, {
                    messaged_by: "ai",
                    message: "Sorry, I encountered an error. Please try again.",
                    createdAt: new Date().toISOString()
                }];
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (newmessage.trim().length > 0) {
                customizeproject();
            }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newmessage.trim().length > 0) {
            customizeproject();
        }
    }

    return (
        <>
            <div className='w-[99%] h-full bg-[#ffffff0f] rounded-[3px]'>
                <div 
                    ref={chatContainerRef}
                    className='w-full h-[80%] overflow-y-scroll hide-scrollbar pb-[2rem]'
                > 
                    {chat.length === 0 ? (
                        <div className='flex items-center justify-center h-full text-gray-400 text-center px-4'>
                            <p>Start a conversation with SiteGenie to customize your website!</p>
                        </div>
                    ) : (
                        chat.map((message, index) => (
                            <div key={index} className='flex mt-[1rem] w-[95%] m-auto bg-[#ffffff0f] px-[0.5rem] py-[1rem] rounded-[5px] gap-[1rem]'>
                                <div>
                                    <h2 className='text-[1.5rem]'>
                                        {message.messaged_by === "user" ? "👤" : "🤖"}
                                    </h2>
                                </div>
                                <div className='flex-1'>
                                    <h2 className='text-[1.3rem] text-gray-300 break-words'>
                                        {message.message}
                                    </h2>
                                    {message.createdAt && (
                                        <p className='text-xs text-gray-500 mt-1'>
                                            {new Date(message.createdAt).toLocaleTimeString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                <div className='w-full h-[20%] flex'>
                    <form className='w-full h-full flex' onSubmit={handleSubmit}>
                        <div className='w-[95%] m-auto h-[80%] relative'>
                            <textarea  
                                onKeyDown={handleKeyDown} 
                                value={newmessage} 
                                onChange={(e) => setNewmessage(e.target.value)}  
                                className='hide-scrollbar bg-black w-full h-full rounded-[7px] px-[0.5rem] py-[0.5rem] text-[1.5rem] outline-none resize-none' 
                                placeholder={isLoading ? 'SiteGenie is thinking...' : 'Ask SiteGenie...'}
                                disabled={isLoading}
                                rows={2}
                            />
                            {newmessage.trim() && (
                                <button 
                                    type="submit"
                                    disabled={isLoading}
                                    className='absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm'
                                >
                                    {isLoading ? '...' : 'Send'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SideAiChat
