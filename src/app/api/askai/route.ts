import { SITE_GENERATOR_PROMPT } from '@/prompt/prompt';
import { NextResponse } from 'next/server';
import { connectDB } from '@/db/db';
import { GoogleGenAI } from "@google/genai";
//db models
import { ProjectModel } from '@/model/project';
import { MessageModel } from '@/model/Message';
import { UserModel } from '@/model/Usermodel';
import { UserProject } from '@/model/userproject';
import { getuser } from '@/lib/getuser';

export const POST = async(req: Request) => {
    try {
      await connectDB();
        const { userquery } = await req.json();
        const user = await getuser();
        if(user==null){
            return NextResponse.json({success:false,error:"Please login first"})
        }
        const user_data = await UserModel.findOne({email:user.user?.email});
        
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
                  text: SITE_GENERATOR_PROMPT
                }
              ]
            },
            {
              role: "user", 
              parts: [
                {
                  text: `userquery: ${userquery}`
                }
              ]
            }
          ],           
          config: {
            responseMimeType: "application/json"
          }
        });
        const res = completion.text; 
        let parsed;
        if (res != null) {
          parsed = JSON.parse(res);
        }

        const project = await ProjectModel.create({
          project_name:parsed.project_name,
          html:parsed.html,
          css:parsed.css,
          js:parsed.js,
          combined:parsed.combined,
          user_id:user_data._id
        })

        await MessageModel.create({
          message:userquery,
          user_id:user_data._id,
          messaged_by:"user",
          project_id:project._id
        })
        await MessageModel.create({
          message:parsed.message,
          user_id:user_data._id,
          messaged_by:"ai",
          project_id:project._id
        })

        await UserProject.create({
          projectname:project.project_name,
          user_id:user_data._id,
          projectid:project._id
        })

        return NextResponse.json({
          success: true,
          chatid: project._id,
        });
        
    } catch (error) {
        console.error('API Error:', error); // Add logging
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error',
            success: false
        }, { status: 500 });
    }
}
