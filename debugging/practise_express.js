const express=require('express');
const app=express();
const port =4000;
const orderRouter=require('./routes/orders');
const userRouter=require('./routes/users');

app.use('/orders',orderRouter);
app.use("/users",userRouter);

/*app.use(express.json());
app.use((req,res,next)=>{
  console.log(`${req.method} request made to ${req.url}`);
  next();
})*/

/*app.all('*',(req,res)=>{
  res.status(404);
  res.send('<h1>404-Page Not Found');
})*/
app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`);
})