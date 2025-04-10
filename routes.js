const fs=require("fs")
const requestHandler=(req,res)=>{
    const url=req.url;
    const method=req.method;
    res.setHeader('Content-Type','text/html');
    if(req.url==='/'){
      res.end(`<form action='/message' method="POST">
        <label>Name:</label>
        <input type="text" name="username"/>
        <button type="submit">Add</button>
        </form>
        `);
    }
    else{
      if(req.url==='/message'){
         let dataChunks=[];
         req.on('data',(chunks)=>{
          dataChunks.push(chunks);
         });
         req.on('end',()=>{
          let combinedBuffer=Buffer.concat(dataChunks);
          //console.log(combinedBuffer);
          let formData=combinedBuffer.toString();
         // console.log(formData);
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
            res.end(`<h1>${data.toString()}</h1>`);
          })
        }
      }
    }
  }
  const anotherOne=()=>{
    console.log("Another function")
  }
 /* module.exports={
    handler:requestHandler,
    testFunction:anotherOne
  };*/
  module.exports.handler=requestHandler;
  module.exports.testFunction=anotherOne;