const express = require('express');
const path = require('path');
const moment = require('moment')
const members = require('./Members')

const app = express();


// this will be a simple restful api
app.get('/api/members', (req, res) => {
  res.json(members); // here we don't have to to .stringify
}); 

// a simple middlewar function
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`) // this will give us the whole url that it sends
  next();
}

// Init middleware, this will run everytime we make a request
app.use(logger); 


// this is to serve static files
// Setting the static folder
app.use(express.static(path.join(__dirname, 'public')))

// this isn't ideal because we have to create a route for each page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

/**
 * 
 * this is an example 
     app.get('/', (req, res) => {
       res.send("Hello World!!!!")
     })
 */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`))