const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(__dirname, 'files');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method.toLowerCase() === 'options') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm();
    form.uploadDir = UPLOAD_DIR;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error uploading file: ${err.message}`);
        return;
      }
      const filename = path.basename(files.fileToUpload.path);
      const url = `${req.headers.host}/files/${filename}`;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`File uploaded successfully! Here's your link: <a href="${url}">${url}</a>`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
