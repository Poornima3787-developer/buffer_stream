const http=require('http');
const routes=require("./routes")
routes.testFunction();
const server=http.createServer(routes.handler);
server.listen(2001,()=>{
  console.log("Server is running");
})