import { NextResponse } from "next/server";
import { UserModel } from "@/model/Usermodel";
import bcrypt from 'bcryptjs';
import { connectDB } from "@/db/db";
export const POST = async (req: Request) => {
    try {
        const {name,email,password} = await req.json()
        await connectDB();
        if(!name || !email || !password){
            return NextResponse.json({
                success:false,
                message:"Please fill in all the fields"})
        }
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return NextResponse.json({success:false,message:"User already exists"})
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({name,email,password:hashpassword})
        return NextResponse.json({success:true, message:"User created successfully",user}, {status:201} )
    } catch (error) {
        return NextResponse.json({success:false,error:error}, {status:500} )
    }
}