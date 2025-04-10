const http=require('http');
const server=http.createServer((req,res)=>{
  if(req.url=='/'){
    res.end(`<h1>Hello</h1><h2>Hello</h2>`)
  }
})
server.listen(3000,()=>{
  console.log("Server is running")
})