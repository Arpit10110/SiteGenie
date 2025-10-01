import React from 'react'
import PriceBtn from './ui/PriceBtn';
type PricingPlan = {
    title: string;
    price: string;
    tokens: number;
    points: string[];
    intro: string; 
  };
const PricingCard = ({title,price,tokens,points,intro}:PricingPlan) => {
  return (
    <>
        <div className='w-[27%] max-tablet:w-[60%] max-mobile:w-[80%] px-[1.5rem] pt-[2rem] pb-[7rem] rounded-[10px] border-[1px] border-gray-700 max-tablet:mb-[3rem] ' >  
            <div className='flex flex-col gap-[1.5rem] ' >
                <div>
                    <h2 className='text-[2rem] text-gray-200 ' >{title}</h2>
                    <h3 className='text-[2rem] text-gray-300 robot-font '>{intro}</h3>
                </div>
                <h3  className='text-[2.5rem] text-gray-50 robot-font ' >{price}</h3>
                <PriceBtn tokens={tokens}/>
            </div>
                    <h2 className='w-full py-[0.4px] rounded-2xl bg-[#ffffff38] mt-[3rem]' ></h2>
            <div className='flex flex-col gap-[1rem] w-full mt-[3rem] ' >
                <h3 className='text-[1.5rem] text-gray-400 font-semibold mb-[1rem]'>What&apos;s Included</h3>
                {
                    points.map((point,index)=>{
                        return(
                            <p key={index} className='text-[1.4rem] text-gray-200 robot-font '>✨ {point}</p>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export default PricingCard