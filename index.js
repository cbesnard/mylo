const express = require('express');
const compression = require('compression');
const redirect = require('express-http-to-https');
const path = require('path');
const app = express();

app.use(compression({ threshold: 0 }));
app.use(redirect.redirectToHTTPS([/localhost:(\d{4})/]));
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || '3000';
app.listen(port, function () {
  console.log('Mylo start on port', port);
});
