import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import React from 'react'
type PricingPlan = {
  title: string;
  price: string;
  tokens: number;
  points: string[];
  intro: string; 
};
const Page = () => {
  
  const pricingPlans: PricingPlan[] = [
    {
      title: "Starter",
      price: "₹49",
      tokens: 10000,
      intro: "Perfect for beginners",
      points: [
        "Generate up to 10 simple websites",
        "1 Fresh Build = 1000 tokens",
        "1 Edit = 500 tokens",
        "Download full HTML, CSS, JS code"
      ]
    },
    {
      title: "Growth",
      price: "₹99",
      tokens: 25000,
      intro: "Best for freelancers",
      points: [
        "Generate up to 25 websites or edits",
        "Mix builds and customizations freely",
        "Download all projects instantly",
        "Perfect for freelancers and learners"
      ]
    },
    {
      title: "Pro",
      price: "₹199",
      tokens: 60000,
      intro: "Ideal for agencies",
      points: [
        "Generate up to 60 websites or edits",
        "Best cost-per-build efficiency",
        "Unlimited downloads with responsive code",
        "Ideal for agencies and heavy users"
      ]
    }
  ];
  
  return (
    <>
      <div className='mb-[10rem] max-mobile:mb-[5rem] ' >
        <div className='flex justify-center items-center mt-[2rem] flex-col gap-[2rem]  ' >
          <div className='flex  w-fit max-w-sm  rounded-[10px] bg-gradient-to-tr from-orange-600 to-blue-500 p-0.5 shadow-lg  '>
                      <h2 className=' bg-gray-950 px-[1rem] py-[0.3rem] flex rounded-[10px]  text-[1.5rem] robot-font hover:bg-gray-900 transition-all  '   >PRICING & PLANS</h2>
          </div>
            <h2 className='text-[3.5rem] max-tablet:text-[3rem] max-mobile:text-[2.5rem]  font-bold  text-center robot-font  '>Choose the Plan That&apos;s Right for You</h2>
        </div>
        <div className='flex flex-wrap justify-around items-center mt-[4rem]  ' >
            {
              pricingPlans.map((plan,index)=>{
                return(
                  <PricingCard key={index} intro={plan.intro} title={plan.title} price={plan.price} tokens={plan.tokens} points={plan.points}/>
                )
              })
            }
        </div>
        </div>
        <Footer/>
    </>
  )
}

export default Page


