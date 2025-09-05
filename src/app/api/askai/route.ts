import { SITE_GENERATOR_PROMPT } from '@/prompt/prompt';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey:process.env.OPEN_ROUTE_API_KEY,
  });
export const POST = async(req: Request) => {
    try {
        const { userquery } = await req.json();
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash",
            max_tokens: 10000, 
            messages: [
              {
                role:"system",
                content:SITE_GENERATOR_PROMPT
              },
              {
                "role": "user",
                "content": [
                 {
                    "type":"text",
                    "text":userquery
                 }
                ]
              }
            ],
            
          });
        
          const res =completion.choices[0].message.content
          let parsed ; 
          if(res != null){
            parsed = JSON.parse(res);
          }
          return NextResponse.json({
            sucess:true,
            ai_response:parsed,
            openai_res:completion,
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error,
            success:false
        })
    }
}