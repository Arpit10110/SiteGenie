import { NextResponse } from "next/server";
import { getuser } from "@/lib/getuser";
import { connectDB } from "@/db/db";
import { ProjectModel } from "@/model/project";

export const POST = async(req:Request)=>{
    try {
        const { projectid } = await req.json();
        if(!projectid){
<<<<<<< HEAD
            return NextResponse.json({success:false,message:"Project id is required"});
=======
            return NextResponse.json({success:false,error:"Project id is required"});
>>>>>>> 7524fe89f5eb5a1aa723f7db53a3ccd3d00b2bdd
        }
        await connectDB();
        const user  = await getuser();
        if(!user){
            return NextResponse.json({
                success:false,
<<<<<<< HEAD
                message:"Please login first"
=======
                error:"Please login first"
>>>>>>> 7524fe89f5eb5a1aa723f7db53a3ccd3d00b2bdd
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