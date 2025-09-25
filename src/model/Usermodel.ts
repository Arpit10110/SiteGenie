import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    googleid:{
        type:String,
    }
})

export const UserModel = mongoose.models?.User || mongoose.model("User",userSchema)