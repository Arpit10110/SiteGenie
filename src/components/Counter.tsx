import React from 'react'

const Counter = ({setCounter,counter}) => {
  return (
   <>
     <button onClick={()=>{
          const val = counter+1
          setCounter(val)
        }}>+</button>
        <h2>{counter}</h2>
        <button onClick={()=>{
          if(counter<=0){
            alert("no negative")
          }else{
            const val = counter-1
            setCounter(val)
          }

        }} >-</button>
   </>
  )
}

export default Counter