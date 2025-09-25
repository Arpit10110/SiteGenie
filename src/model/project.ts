import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    project_name:{
        type:String,
        required:true
    },
    html:{
        type:String,
        required:true
    },
    css:{
        type:String,
        required:true
    },
    js:{
        type:String,
        required:true
    },
    combined:{
        type:String,
        required:true
    },
    user_id:{
         type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:'User'
    }
})

export const ProjectModel = mongoose.models.Project || mongoose.model('Project',projectSchema);