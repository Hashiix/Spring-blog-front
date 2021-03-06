function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

const express = require('express');
const app = express();
const path = require('path');

app.use(requireHTTPS);
app.use(express.static(__dirname + '/dist/blog-frontend'));

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname + '/dist/blog-frontend/index.html'))
);

app.listen(process.env.PORT || 8080);
