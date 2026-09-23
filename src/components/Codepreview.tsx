import React, { useEffect, useRef } from 'react'

const Codepreview= ({combinedcode}:{combinedcode:string}) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        if (!iframeRef.current) return
        iframeRef.current.srcdoc = combinedcode
    }, [combinedcode])

    return (
        <div className="w-full h-full bg-white rounded-lg overflow-hidden border border-gray-300">
            <iframe 
                ref={iframeRef}
                className="w-full h-full border-0"
                title="Code Preview"
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
            />
        </div>
    )
}

export default Codepreview
