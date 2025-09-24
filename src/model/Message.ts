import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    messaged_by:{
        type:String,
        required:true,
        enum:['user','ai']
    },
    project_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Project'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const MessageModel = mongoose.models?.Message || mongoose.model('Message',messageSchema);