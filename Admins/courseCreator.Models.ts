import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    buy : [String],
    id : Number,
    title : String,
    description : String , 
    price : String , 
    Author : String,
})

 
export const course =  mongoose.model("course",courseSchema);