import Link from 'next/link'
import React from 'react'

const SavedProjects = ({savedprojects}:{savedprojects:any[]})=>{
    console.log(savedprojects)
  return (
    <>
        <div className='w-full flex flex-wrap gap-[2rem] mt-[3rem] mb-[5rem] px-[3rem] ' > 
            {
                savedprojects.length > 0 ? (
                    savedprojects.map((i, index) => (
                        <Link key={index}  className='w-[20%] max-tablet:w-[30%] max-mobile:w-[90%] border-[1px] border-gray-600 bg-[#ffffff08] flex flex-wrap justify-center items-center rounded-[1rem] h-[15vh] hover:scale-[1.03] transition-all '  href={`/genielab/project/${i.projectid  }` }>
                            <h2 className='text-[1.5rem] font-semibold text-gray-300 cursor-pointer'>{i.projectname.toUpperCase()}</h2>
                        </Link>
                    ))
                ) : (
                    <h2 className='text-[2rem] text-center w-full font-semibold text-gray-300 cursor-default'>No saved projects</h2>
                )
            }
        </div>
    </>
  )
}

export default SavedProjects