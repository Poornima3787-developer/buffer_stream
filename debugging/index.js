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
app.get("/users/:id",(req,res)=>{
  const userId=parseInt(req.params.id);
  const user=users.find(u=>u.id===userId);
  if(!user){
    return res.status(404).json({message:'user not found'});
  }
  res.json(user);
})
app.post("/users",(req,res)=>{
  const {name}=req.body;
  const newUser={id:users.length+1,name};
  users.push(newUser);
  res.status(201).json(newUser);
})
app.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
});