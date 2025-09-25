import { NextResponse } from "next/server";
import { getuser } from "@/lib/getuser";
import { UserModel } from "@/model/Usermodel";
import { connectDB } from "@/db/db";
import { ProjectModel } from "@/model/project";

export const POST = async(req:Request)=>{
    try {
        const { projectid } = await req.json();
        if(!projectid){
            return NextResponse.json({success:false,error:"Project id is required"});
        }
        await connectDB();
        const user  = await getuser();
        if(!user){
            return NextResponse.json({
                success:false,
                error:"Please login first"
            })
        }
        await connectDB();
        const user_projects = await ProjectModel.findById(projectid);
        if(!user_projects){
            return NextResponse.json({success:false,message:"No projects found"})
        }
        const combinedcode = user_projects.combined;

        return NextResponse.json({
            success:true,
            combinedcode:combinedcode
        })
    } catch (error) {
        return NextResponse.json({success:false,error:error});
    }
}