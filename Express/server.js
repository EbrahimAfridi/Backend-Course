const express = require('express');
const app = express();

app.use(function(req, res, next) {  
  console.log('Time:', Date.now());
  next();
});

app.get('/', function(req, res) {
  res.send("Hello World");
});

app.get('/about', function(req, res, next) {
  return next(new Error('Error in /about'));
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(3000);