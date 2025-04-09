const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    fs.readFile('formValues.txt', (err, data) => {
      const savedName = !err ? data.toString() : '';
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <h2> ${savedName || 'undefined'}</h2>
        <form action='/message' method="POST">
          <label>Name:</label><br>
          <input type="text" name="username"><br>
          <button type="submit">Add</button>
        </form>
      `);
    });

  } else if (url === '/message' && method === 'POST') {
    let dataChunks = [];

    req.on('data', (chunk) => {
      dataChunks.push(chunk);
    });

    req.on('end', () => {
      const combinedBuffer = Buffer.concat(dataChunks);
      const formData = combinedBuffer.toString();
      const formValue = decodeURIComponent(formData.split('=')[1]);

      fs.writeFile('formValues.txt', formValue, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      });
    });

  } else if (url === '/read') {
    fs.readFile('formValues.txt', (err, data) => {
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h1>${data.toString()}</h1>`);
    });

  } else {
    res.statusCode = 404;
    res.end('<h1>Page Not Found</h1>');
  }
});

server.listen(2000, () => {
  console.log("Server is running");
});
