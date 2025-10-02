import { NextResponse } from "next/server"; 
import { getuser } from "@/lib/getuser"; 
import { UserModel } from "@/model/Usermodel"; 
import { connectDB } from "@/db/db"; 
import { UserProject } from "@/model/userproject";
import { TokenModel } from "@/model/Token";
export const GET = async(req:Request)=>{
    try {
        const user  = await getuser();
        if(!user){
            return NextResponse.json({
                success:false,
                error:"Please login first"
            })
        }
        await connectDB();
        const user_data = await UserModel.findOne({email:user?.user?.email});
        const token = await TokenModel.findOne({userid:user_data._id})
        const userprojects = await UserProject.find({user_id:user_data._id})
        if(!user_data){
            return NextResponse.json({success:false,error:"No user data found"})
        }
        return NextResponse.json({success:true,user_data,userprojects,token:token.token})
    } catch (error) {
        return NextResponse.json({success:false,error:error});
    }
}