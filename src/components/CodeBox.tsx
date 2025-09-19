"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'

const Editor = dynamic(() => import('@monaco-editor/react'), { 
  ssr: false,
  loading: () => <div>Loading editor...</div>
})

interface FileData {
    name: string
    language: string
    content: string
}
interface CodeBoxProps {
    htmlcontent: string
    csscontent: string
    jscontent: string
}
const CodeBox = ({htmlcontent,csscontent,jscontent}:CodeBoxProps) => {
 

    const [activeFile, setActiveFile] = useState<string>('index.html')
 




    const files: Record<string, FileData> = {
        'index.html': {
        name: 'index.html',
        language: 'html',
        content: htmlcontent
        },
        'styles.css': {
        name: 'styles.css',
        language: 'css',
        content: csscontent
        },
        'script.js': {
        name: 'script.js',
        language: 'javascript',
        content: jscontent
        }
    }



    return (
        <div className="w-full h-full flex bg-[#ffffff0f]">
          {/* File Tabs */}
          <div className='w-[15%] px-[0.2rem] h-full border-gray-700'>
            <div className='mt-[2rem] w-full justify-center items-center flex flex-col gap-[2rem]'>
                <button onClick={() => setActiveFile("index.html")} className={`text-[#f54343] text-[1.5rem] border-[1px] border-gray-700 rounded-[5px] w-[90%] cursor-pointer ${activeFile=="index.html"?"bg-[#ffffff18]":"bg-transparent"} `} >Index.html</button> 
                <button onClick={() => setActiveFile("styles.css")} className={`text-blue-500 text-[1.5rem] border-[1px] border-gray-700 rounded-[5px] w-[90%] cursor-pointer ${activeFile=="styles.css"?"bg-[#ffffff18]":"bg-transparent"} `}>Styles.css</button>
                <button onClick={() => setActiveFile("script.js")} className={`text-yellow-500 text-[1.5rem] border-[1px] border-gray-700 rounded-[5px] w-[90%] cursor-pointer ${activeFile=="script.js"?"bg-[#ffffff18]":"bg-transparent"} `}>Script.js</button>
            </div>
          </div>
    
          {/* Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={files[activeFile].language}
              value={files[activeFile].content}
              theme="vs-dark"
              options={{
                readOnly: true,
                domReadOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: true,
                automaticLayout: true,
                fontSize: 12,
                lineNumbers: 'on',
                wordWrap: 'on',
                folding: true,
                contextmenu: false,
                selectOnLineNumbers: false,
                renderWhitespace: 'selection',
                cursorStyle: 'line',
                cursorBlinking: 'solid',
                renderLineHighlight: 'none',
                hideCursorInOverviewRuler: true,
              }}
            />
          </div>
        </div>
    )
}

export default CodeBox