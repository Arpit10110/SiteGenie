import { NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { UserModel } from "@/model/Usermodel";


const cashfree = new Cashfree(
    // CFEnvironment.PRODUCTION,
    CFEnvironment.SANDBOX,
    process.env.Cashfree_App_ID, 
    process.env.Cashfree_Secret
  );
  
export const POST = async(req)=>{
    try {
        const {orderId} = await req.json();
        const user = await getuser();
        if (user==null) {
            return NextResponse.json({
                success: false,
                message: "Please LogIn First",
            });
        }
        const user_data = UserModel.findOne({email:user.email});
        const response = await cashfree.PGOrderFetchPayments(orderId);
        if(response.data.payment_status=="SUCCESS"){
            return NextResponse.json({success:true,data:response.data})
        }
        return NextResponse.json({success:false,message:"Payment Failed"})
    } catch (error) {
        return NextResponse.json({success:false,message:error})
    }
}