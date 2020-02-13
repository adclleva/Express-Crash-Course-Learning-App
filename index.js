const express = require('express');
const path = require('path');
const members = require('./Members')
const logger = require('./middleware/logger')
const app = express();


// this will be a simple restful api
app.get('/api/members', (req, res) => {
  res.json(members); // here we don't have to to .stringify
});
  
// This is to initialize middleware, this will run everytime we make a request
// app.use(logger);


// Get Single Member
app.get('/api/members/:id', (req, res) => {
  // res.send(req.params.id) this will just show a number on the page

  const found = members.some(member => member.id === parseInt(req.params.id)) // this will check if there's a member with the given id

  if (found) { // if it exists
    res.json(members.filter(member => {
      /**
       * keep in mind that the req.params returns it as a string while our member obj.id is a number
       * otherwise it will return an empty array
       */
      return member.id === parseInt(req.params.id) // we use .params to utilize the params id for this case
    }))
  } else { // we give a 400 status because there isnt a member with that id
    res.status(400).json({msg: `No member with the id of ${req.params.id}`}) 
  }
})

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