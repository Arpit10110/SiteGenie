import { NextResponse } from "next/server";
import { getuser } from "@/lib/getuser";
import { UserModel } from "@/model/Usermodel";
import { UserProject } from "@/model/userproject";

export const GET = async()=>{
    try {
        const user  = await getuser();
        if(!user){
            return NextResponse.json({
                success:false,
                error:"Please login first"
            })
        }
        const user_data = await UserModel.findOne({email:user?.user?.email});
        const user_projects = await UserProject.find({user_id:user_data._id});
        if(!user_projects){
            return NextResponse.json({success:true,message:"No projects found"})
        }
        return NextResponse.json({success:true,projects:user_projects})
    } catch (error) {
        return NextResponse.json({success:false,error:error});
    }
}