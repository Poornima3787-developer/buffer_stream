const express=require('express');
const app=express();
const port =4000;
const bookRoutes=require('./routes/books');


app.use(express.json());

app.use('/books',bookRoutes);

app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`);
})