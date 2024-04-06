import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : String , 
    password : String
})

export const normaluser =  mongoose.model("normaluser", userSchema);