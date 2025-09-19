"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@monaco-editor/react'), { 
  ssr: false,
  loading: () => <div>Loading editor...</div>
})
interface FileData {
    name: string
    language: string
    content: string
  }
const CodeBox: React.FC  = () => {
    const [activeFile, setActiveFile] = useState<string>('index.html')

    // Sample file data - replace with your actual content
    const files: Record<string, FileData> = {
        'index.html': {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My Website</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <div class="container">
                    <h1>Hello World!</h1>
                    <button onclick="showAlert()">Click Me</button>
                </div>
                <script src="script.js"></script>
            </body>
            </html>`
                },
                'styles.css': {
                name: 'styles.css',
                language: 'css',
                content: `* {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
            }

            .container {
                max-width: 800px;
                margin: 50px auto;
                text-align: center;
                padding: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            h1 {
                color: #333;
                margin-bottom: 20px;
            }

            button {
                background: #007bff;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }

            button:hover {
                background: #0056b3;
            }`
                },
                'script.js': {
                name: 'script.js',
                language: 'javascript',
                content: `// Interactive functionality
            function showAlert() {
                alert('Hello from JavaScript!');
            }

            // DOM manipulation when page loads
            document.addEventListener('DOMContentLoaded', function() {
                console.log('Page loaded successfully!');
                
                const button = document.querySelector('button');
                if (button) {
                    button.addEventListener('mouseover', function() {
                        this.style.transform = 'scale(1.05)';
                    });
                    
                    button.addEventListener('mouseout', function() {
                        this.style.transform = 'scale(1)';
                    });
                }
            });
            // Example of modern JavaScript features
            const greetUser = (name = 'User') => {
                return \`Welcome, \${name}!\`;
            };

            console.log(greetUser('Developer'));`
                }
        }



    return (
        <div className="w-full h-full flex  bg-[#ffffff0f]">
          {/* File Tabs */}
        <div className='w-[15%] px-[0.2rem] h-full  border-gray-700 ' >
           <div className='mt-[2rem] w-full justify-center items-center flex flex-col gap-[2rem] ' >
                <button onClick={() => setActiveFile("index.html")} className={`text-[#f54343] text-[1.5rem] border-[1px] border-gray-700 rounded-[5px] w-[90%] cursor-pointer ${activeFile=="index.html"?"bg-[#ffffff18]":"bg-transparent"} `} >Index.html</button> 
                <button onClick={() => setActiveFile("styles.css")} className={`text-blue-500  text-[1.5rem] border-[1px] border-gray-700 rounded-[5px]   w-[90%] cursor-pointer ${activeFile=="styles.css"?"bg-[#ffffff18]":"bg-transparent"} `}>Styles.css</button>
                <button onClick={() => setActiveFile("script.js")} className={`text-yellow-500  text-[1.5rem] border-[1px] border-gray-700 rounded-[5px]  w-[90%] cursor-pointer ${activeFile=="script.js"?"bg-[#ffffff18]":"bg-transparent"} `}>Script.js</button>
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
                readOnly: true, // Makes editor read-only
                domReadOnly: true, // Additional read-only protection
                minimap: { enabled: false }, // Disable minimap
                scrollBeyondLastLine: true,
                automaticLayout: true,
                fontSize: 12,
                lineNumbers: 'on',
                wordWrap: 'on',
                folding: true,
                contextmenu: false, // Disable right-click menu
                selectOnLineNumbers: false, // Disable line number selection
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



// {/* <div className="flex bg-gray-800 border-b border-gray-700">
// {Object.keys(files).map((fileName) => (
//   <button
//     key={fileName}
//     onClick={() => setActiveFile(fileName)}
//     className={`px-4 py-2 text-sm font-medium border-r border-gray-700 transition-colors ${
//       activeFile === fileName
//         ? 'bg-gray-700 text-white'
//         : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
//     }`}
//   >
//     {files[fileName].name}
//   </button>
// ))}
// </div> */}