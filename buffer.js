const http=require('http');
const fs=require("fs");
const server=http.createServer((req,res)=>{
  const url=req.url;
  const method=req.method;
  if(req.url==='/'){
    res.setHeader('Content-Type','text/html');
    res.end(
      <form action='/message' method="POST">
      <label>Name:</label>
      <input type="text" name="username"></input>
      <button type="submit">Add</button>
      </form>
      )
  }
  else{
    if(req.url=='/message'){
       res.setHeader('Contenet-Type','text/html');
       let dataChunks=[];
       req.on('data',(chunks)=>{
        dataChunks.push(chunks);
       })
       req.on('end',()=>{
        let combinedBuffer=Buffer.concat(dataChunks);
        console.log(combinedBuffer);
        let formData=combinedBuffer.toString();
        console.log(formData);
        const formValues=formData.split('=')[1];
        fs.writeFile('formValues.txt',formValues,(err)=>{
          res.statusCode=302;
          res.setHeader('Location','/');
          res.end();
        })
       });
    }else{
      if(req.url=='/read'){
        fs.readFile('formValues.txt',(err,data)=>{
          console.log(data.toString());
          res.end(<h1>${data.toString()}</h1>);
        })
      }
    }
  }
})
server.listen(2000,()=>{
  console.log("server is running");
})