import { NextResponse } from "next/server";
import { UserModel } from "@/model/Usermodel";
import { connectDB } from "@/db/db";
import { TokenModel } from "@/model/Token";

export const POST = async (req: Request) => {
    try {
        const {email,name,googleid,image} = await req.json();
        if(!email || !name || !googleid || !image){
            return NextResponse.json({success:false,message:"Please fill in all the fields"})
        }
        await connectDB();
        let user = await UserModel.findOne({email})
        if(!user){
            user = await UserModel.create({name,email,googleid:googleid})
            await TokenModel.create({token:2000,userid:user._id});
        }
        return NextResponse.json({success:true,message:"Login Successful",user})
    } catch (error) {
        return NextResponse.json({success:false,error:error} )
    }
}