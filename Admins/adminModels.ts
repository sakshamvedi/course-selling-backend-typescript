import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : String , 
    password : String
})

export const user =  mongoose.model("user", userSchema);