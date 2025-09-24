import { NextResponse } from "next/server";
import { connectDB } from "@/db/db";
import { MessageModel } from "@/model/Message";
import { getuser } from "@/lib/getuser";

export const POST = async (req: Request) => {
    try {
        const { project_id } = await req.json();
        const user = await getuser();
        if(!user){
            return NextResponse.json({
                success:false,
                error:"Please login first"
            })
        }
        await connectDB();
        const chats = await MessageModel.find({project_id:project_id}).sort({createdAt:1});
        return NextResponse.json({success:true,chats:chats});
    } catch (error) {
        return NextResponse.json({success:false,error:error});
    }
}