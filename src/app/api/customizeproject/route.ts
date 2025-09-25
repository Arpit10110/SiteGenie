import { NextResponse } from "next/server";
import { getuser } from "@/lib/getuser";
import { UserModel } from "@/model/Usermodel";
import { connectDB } from "@/db/db";
import { ProjectModel } from "@/model/project";
import { GoogleGenAI } from "@google/genai";
import { SITE_MODIFICATION_PROMPT } from "@/prompt/modification_prompt";
import { MessageModel } from "@/model/Message";

export const POST = async(req:Request)=>{
    try {
        const { project_id,chat,usermessage } = await req.json();
        if(!usermessage){
            return NextResponse.json({success:false,error:"User message is required"});
        }
        if(!project_id){
            return NextResponse.json({success:false,error:"Project id is required"});
        }
        if(!chat){
            return NextResponse.json({success:false,error:"Chat is required"});
        }
        const user  = await getuser();
        if(!user){
            return NextResponse.json({
                success:false,
                error:"Please login first"
            })
        }
        await connectDB();
        const user_data = await UserModel.findOne({email:user?.user?.email});
        let user_projects = await ProjectModel.findById(project_id);
        if(!user_projects){
            return NextResponse.json({success:false,message:"No projects found"})
        }

        const formatChatHistory = (chatMessages: any[]) => {
            return chatMessages
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) // Sort by timestamp
                .map((msg) => {
                    const role = msg.messaged_by === 'user' ? 'User' : 'Assistant';
                    const timestamp = new Date(msg.createdAt).toLocaleString();
                    return `[${timestamp}] ${role}: ${msg.message}`;
                })
                .join('\n\n');
        };

        const formattedChatHistory = formatChatHistory(chat);


        // ai work idhar hoga mera

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY!,
        });
        
        const completion = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "model", 
                    parts: [
                        {
                            text: SITE_MODIFICATION_PROMPT
                        }
                    ]
                },
                {
                    role: "user", 
                    parts: [
                        {
                            text: `=== PREVIOUS CONVERSATION HISTORY ===
${formattedChatHistory}

=== NEW USER REQUEST ===
${usermessage}

Please analyze the existing website code from the conversation history above and modify it according to the new user request. Make sure to:
1. Preserve all existing functionality unless explicitly asked to remove it
2. Build upon the existing code structure and design
3. Maintain the same coding style and patterns used previously
4. Ensure the modifications integrate seamlessly with the existing codebase`
                        }
                    ]
                }
            ],           
            config: {
                responseMimeType: "application/json"
            }
        });


        const aiResponse = completion.text;
        let parsed;
        if (aiResponse != null) {
          parsed = JSON.parse(aiResponse);
        }

        if(!parsed.success){
            return NextResponse.json({success:true,error:parsed.message});
        }
        await ProjectModel.updateOne({_id:project_id},{$set:{html:parsed.html,css:parsed.css,js:parsed.js,combined:parsed.combined}});

        await MessageModel.create({
            message:usermessage,
            user_id:user_data._id,
            messaged_by:"user",
            project_id:project_id
        })
        await MessageModel.create({
            message:parsed.message,
            user_id:user_data._id,
            messaged_by:"ai",
            project_id:project_id
        })
        
        return NextResponse.json({
            success:true,
            user_projects,
            parsed
        })
    } catch (error) {
        return NextResponse.json({success:false,error:error});
    }
}