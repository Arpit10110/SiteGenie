import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    token:{
        type:Number,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
})

export const TokenModel = mongoose.models?.Token || mongoose.model("Token",Schema)