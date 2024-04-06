import express from 'express';
import bodyParser from 'body-parser';
import dbConfig from './db/db.config';
import {user} from './Admins/adminModels';
import{ course} from './Admins/courseCreator.Models';
import { normaluser } from './Users/usersModel';
import dbconfig from './db/db.config';
const app = express();
app.use(bodyParser.json());
const PORT = 3000;

dbConfig();

app.post('/adminSignup', async (req, res) => {
   const {username , password} = req.body;
   if((await user.find({username})).length > 0){
     console.log("user already exist")
     res.status(202).send("duplicate date found");
   }
  
 else{
   const userdata = new user({
    "username" : username ,
    "password" : password
   });
  await userdata.save();
  
  res.status(200).send("User Signup Successfully");
 }

    
});

app.post('/adminlogin', async(req, res) => {
  const {username , password} = req.body;
   if((await user.find({username})).length>0){
     console.log("hey welcome" + username)
   
     res.status(200).send("user loginned successfully !!! ");
   }
  
 else{
  res.status(404).send("no data found");
 }
   
});
app.post('/userSignup', async (req, res) => {
   const {username , password} = req.body;
   if((await normaluser.find({username})).length > 0){
     console.log("user already exist")
     res.status(202).send("duplicate date found");
   }
  
 else{
   const userdata = new normaluser({
    "username" : username ,
    "password" : password
   });
  await userdata.save();
  
  res.status(200).send("User Signup Successfully");
 }

    
});

app.post('/userlogin', async(req, res) => {
  const {username , password} = req.body;
   if((await normaluser.find({username})).length>0){
     console.log("hey welcome" + username)
   
     res.status(200).send("user loginned successfully !!! ");
   }
  
 else{
  res.status(404).send("no data found");
 }
   
});


app.post('/addCourse' ,async (req , res)=>{ 
   const courseCreatorId = await course.find();
   console.log(courseCreatorId);
   const{title , description , price , Author} = req.body;
   const courseData = new course({
    "id" : courseCreatorId.length+1,
     "title" : title,
     "author" : Author,
      "price" : price, 
      "description" : description,
   })
   await courseData.save();
     res.status(200).send("Course Created Successfully ")
})

app.post('/deleteCourse?:id' ,async (req, res)=>{
  try {
    const ids = req.query.id;
      await course.deleteOne({"id" : ids});
      res.status(200).send("Course Deleted Successfully")
  } catch (error) {
    console.log(error)
     res.status(404).send("Course Not  Deleted Successfully")
  }

})

app.post('/updateCourse?:id' ,async (req , res)=>{
           
   const courseCreatorId = "";
   const id =req.query.id;
   const body = req.body;
       const{title , description , price , Author} = req.body;
 await course.updateOne(
  {"id" :id},
  { $set: {
     "title" : title,
     "author" : Author,
      "price" : price, 
      "description" : description,
   } }
 )
      res.status(200).send("Course Updated");
})

app.post('/buycourse?:id' , async(req , res)=>{

})

app.get("/" , (req , res) =>{
     res.status(200).send("");
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});