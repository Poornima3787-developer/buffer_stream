//const http=require('http');
const express=require('express');
const app=express();
const PORT=3000;
app.use((req,res,next)=>{
  console.log(`Server is up and running on port ${PORT}! Ready to handle requests.`);
  res.send("<h1>Hello</h1>")
})
/*const server=http.createServer(app)
server.listen(3000);*/
app.listen(PORT);