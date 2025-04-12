const express=require('express');
const app=express();
const PORT=3000;
//Authentication middleware
app.use("/welcome",(req,res,next)=>{
 console.log("Welcome");
 next();
})
app.use((req,res,next)=>{
  console.log("Authentication middleware");
  next();
})
app.use("/library-2",(req,res,next)=>{
  console.log("book recommendations");
  next();
})
app.use("/library-3",(req,res,next)=>{
  console.log("Special access to research paper from professors and seniors ");
  next();
})
app.get("/welcome",(req,res)=>{
  res.send("<h1>Welcome</h1>")
})
app.get("/library-2",(req,res)=>{
  res.send("<h1>Library 2 Entered</h1>")
})
app.get("/library-3",(req,res)=>{
  res.send("<h1>Library 3 is entered</h1>");
})
app.listen(PORT,()=>{
  console.log("Server is running")
});