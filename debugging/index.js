const express=require('express');
const app=express();
const PORT=3000;
//Authentication middleware
app.use(express.json());

let users=[
  {id:1,name:'Alice'},
  {id:2,name:'Bob'}
];

app.get("/users",(req,res)=>{
  res.json(users);
})
app.post("/users",(req,res)=>{
  const {name}=req.body;
  const newUser={id:users.length+1,name};
  users.push(newUser);
  res.status(201).json(newUser);
})
app.listen(PORT,()=>{
  console.log("Server is running")
});