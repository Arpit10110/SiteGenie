import { NextResponse } from "next/server";
import { UserModel } from "@/model/Usermodel";
import bcrypt from 'bcryptjs';
import { connectDB } from "@/db/db";
import {signIn} from "@/auth";
export const POST = async (req: Request) => {
    try {
        const {email,password} = await req.json()
        if(!email || !password){
            return NextResponse.json({success:false,message:"Please fill in all the fields"})
        }
        await connectDB();
        const user = await UserModel.findOne({email})
        if(!user){
            return NextResponse.json({success:false,message:"Please Signup First"})
        }
        if(!user.password){
            return NextResponse.json({success:false,message:"Please login with Google"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return NextResponse.json({success:false,message:"Invalid Password"})
        }
        await signIn("credentials",{email:user.email,name:user.name,id:user._id,redirect:false})
        return NextResponse.json({success:true,message:"Login Successful"})
    } catch (error) {
        return NextResponse.json({success:false,error:error} )
    }
}