import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
    projectname:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    projectid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Project'
    }
})

export const UserProject = mongoose.models?.UserProject || mongoose.model("UserProject",Schema) 