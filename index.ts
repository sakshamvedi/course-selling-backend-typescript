import express from 'express';
import userCreds from './Admins/adminModels';
import bodyParser from 'body-parser';
import courseArray from './Admins/courseCreator.Models';
const app = express();
app.use(bodyParser.json());
const PORT = 3000;


app.post('/adminSignup', (req, res) => {
   const {username , password} = req.body;
      userCreds.map((data)=>{
        if(data.username == username){
            res.status(404).send("User Already Exist");
        }
        else{
            userCreds.push(req.body)
        }
      })
    res.status(200).send()
});

app.post('/login', (req, res) => {
   const {username , password} = req.body;
     userCreds.map((data)=>{
        if(data.username == username && data.password == password){
            res.status(200).send("hey welcome" + data.username);
        }
        else{
           res.status(404).send("User Not found");
        }
      })
    res.status(200).send()
});


app.post('/addCourse' , (req , res)=>{
      
    courseArray.push({ "id": courseArray.length + 1, ...req.body });
     res.status(200).send("Updated")
})

app.post('/deleteCourse' , (req, res)=>{
   var currentCourses = courseArray;
  currentCourses = courseArray.filter((data)=>{
        if(data.id == req.body.id){
           return false;
        }
        else{
            return true;
        }
    })
    courseArray.splice(0 , courseArray.length);
    courseArray.push(...currentCourses);
    res.status(200).send("Course  Deleted");
})

app.post('/updateCourse' , (req , res)=>{
     const { id , title , description, price, author}  = req.body
     var currentCourses = courseArray.map((data)=>{
        if(data.id == id){
            data.title = title,
            data.description = description,
            data.price = price,
            data.Author = author
        }
     })
      res.status(200).send("Course Updated");
})


app.get("/" , (req , res) =>{
     res.status(200).send(courseArray);
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});