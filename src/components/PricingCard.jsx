"use client"
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import {load} from '@cashfreepayments/cashfree-js'
import PriceBtn from './ui/PriceBtn';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast , ToastContainer } from 'react-toastify';
const PricingCard = ({title,price,tokens,points,intro,pricevalue}) => {
    const cashfreeRef = useRef(null)
    const [open, setOpen] = useState(false);

    const initializeSDK = async () => {
        try {
        // Use "production" for production and "sandbox" for local
        // const instance = await load({ mode: "production" })
        const instance = await load({ mode: "sandbox" })
        cashfreeRef.current = instance
        } catch (e) {
        console.error("Cashfree SDK load failed", e)
        ToastErrorHandler("Unable to load payment SDK. Please refresh the page.")
        }
        }
    
    const getSessionId = async (plan) => {
        try {
          let res = await axios.post("api/payment",{
            plan:plan
          })
          if(res.data.success){
            const orderId = res.data.data.order_id
            return {sessionId:res.data.data.payment_session_id,orderId:orderId}
          }else{
          setOpen(false);
          toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error)
          setOpen(false);
          toast.error("Something went Wrong !!!");
        }
    }

    const verifyPayment = async (orderId,plan,tokens) => {
        try {
          let res = await axios.post("api/paymentverify", {
            orderId: orderId,
            plan:plan,
            tokens:tokens
          })
          console.log(res.data)
          if(res.data.success){
            setOpen(false);
            toast.success("Payment Successful !!!")
          }else{
            setOpen(false);
            toast.error("Payment Failed !!!");
          }
    
        } catch (error) {
          console.log(error)
          setOpen(false);
          toast.error("Something went Wrong !!!");
        }
      }

    const handlepurchase = async (pricevalue,tokens)=>{
        try {
            setOpen(true);
            if (!cashfreeRef.current) {
            await initializeSDK()
            }
            if (!cashfreeRef.current) {
            ToastErrorHandler("Payment Gateway not ready. Please try again in a moment.")
            setOpen(false)
            return
            }

            let {sessionId,orderId} = await getSessionId(pricevalue)

            let checkoutOptions = {
                paymentSessionId : sessionId,
                redirectTarget:"_modal",
            }

             const payment_result = await cashfreeRef.current.checkout(checkoutOptions)

            if(payment_result.paymentDetails){
                console.log(payment_result.paymentDetails)
                verifyPayment(orderId,pricevalue,tokens)
               }else{
                setOpen(false);
               }
        } catch (error) {
            toast.error("Something went Wrong !!!");
            setOpen(false);
            console.log(error)
        }
    }



  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <div className='w-[27%] max-tablet:w-[60%] max-mobile:w-[80%] px-[1.5rem] pt-[2rem] pb-[7rem] rounded-[10px] border-[1px] border-gray-700 max-tablet:mb-[3rem] ' >  
            <div className='flex flex-col gap-[1.5rem] ' >
                <div>
                    <h2 className='text-[2rem] text-gray-200 '  >{title}</h2>
                    <h3 className='text-[2rem] text-gray-300 robot-font '>{intro}</h3>
                </div>
                <h3  className='text-[2.5rem] text-gray-50 robot-font ' >{price}</h3>
                <PriceBtn handlepurchase={handlepurchase} pricevalue={pricevalue} tokens={tokens}/>
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