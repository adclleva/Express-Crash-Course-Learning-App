const express = require('express');
const router = express.Router();
const members = require('../../Members')

/**
 * here we just need the '/' route sine /api/members is the parent route
 */
// this will be a simple restful api
router.get('/', (req, res) => {
  res.json(members); // here we don't have to to .stringify
});
  
// This is to initialize middleware, this will run everytime we make a request
// app.use(logger);

/**
 * here we just need the /:id since /api/members is the parent route
 * thus the route would be /api/members/:id
 */
// Get Single Member
router.get('/:id', (req, res) => {
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

module.exports = router;