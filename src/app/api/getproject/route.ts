import { NextResponse } from 'next/server';
import { connectDB } from '@/db/db';
import { ProjectModel } from '@/model/project';

export const POST = async(req: Request) => {
    try {
        const { projectid } = await req.json();
        await connectDB()
        const project = await ProjectModel.findOne({_id:projectid})
        if(!project){
            return NextResponse.json({
                success:false,
                message:"Project not found"
            })
        }
        return NextResponse.json({
            success:true,
            project:project
        })
        
    } catch (error) {
        console.error('API Error:', error); // Add logging
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error',
            success: false
        }, { status: 500 });
    }
}