import mongoose from "mongoose";
import express from "express";

const app = express();
require('dotenv').config()

async function dbconfig(){
    try {
        const connection_string = process.env.MONGOOSE_CONNECT_STRING;
        const connectInstance = await mongoose.connect(connection_string+"/"+"courseSell");
        console.log("Conncection with instance succesfull")
    } catch (error) {
        console.log(error);
    }
}

export default dbconfig;