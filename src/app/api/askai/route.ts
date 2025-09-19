import { SITE_GENERATOR_PROMPT } from '@/prompt/prompt';
import { NextResponse } from 'next/server';
import { connectDB } from '@/db/db';
import { ProjectModel } from '@/model/project';
import { GoogleGenAI } from "@google/genai";

export const POST = async(req: Request) => {
    try {
        const { userquery } = await req.json();
        
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY!,
        });

        // Correct Gemini API syntax
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
        console.log(completion);
        const res = completion.text; 
        let parsed;
        if (res != null) {
          parsed = JSON.parse(res);
        }

        await connectDB();
        
        const chatid = await ProjectModel.create({
          project_name: parsed.project_name,
          html: parsed.html,
          css: parsed.css,
          js: parsed.js,
          combined: parsed.combined,
          message: parsed.message
        });

        return NextResponse.json({
          success: true,
          ai_response: parsed,
          gemini_res: completion,
          chatid: chatid._id
        });
        
    } catch (error) {
        console.error('API Error:', error); // Add logging
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error',
            success: false
        }, { status: 500 });
    }
}
