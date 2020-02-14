
const express = require('express');
const router = express.Router();
const members = require('../../Members')
const uuid = require('uuid') // a package for creating

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

/**
 * Creating a Member, a post request
 * we can use the same routes as long as we use different requests methods
 * 
 * in Postman, for the headers, key: Content-Type and the Value: application/json
 *  then for Body, it'll be raw and then the JSON data
 *  for example: also remember that the keys are strings too
 *      {
 *      	"name": "Jake Smith",
 *        "email": "jake@email.com"       
 *      }
 *  then you need to use a body parser and we have to initialize it as middleware
 * */ 
router.post('/', (req, res) => {
  // res.send(req.body) -> this line just shows us what is 'posted' or created

  const newMember = { 
    id: uuid.v4(), // this will create a unique id
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if (!newMember.name || !newMember.email) { // this is if if the
    return res.status(400).json({ msg: 'Please include a name and email' })
  }

  members.push(newMember); 
  // res.json(members) --> we don't usually show a json object once it has been create, usually it will do a redirect with the new member with server rendering views
  // res.redirect('/create-new-member') --> this redirects to the page with the new member

  res.json(members)
})


/* Updating a Member with a put request */
router.put('/:id', (req, res ) => {
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (found) {
    const updateMember = req.body;

    if (!updateMember.name && !updateMember.email) {
      return res.status(400).json({ msg: `Can't edit member with the id of ${req.params.id}, please edit either the name or email parameters` })

    }
    
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) { // this will
        member = {
          ...member,
          name: updateMember.name || member.name,
          email: updateMember.email || member.email
        }
        // then we send back a response
        res.json({ msg: 'Member updated', member: member})
      }
    })
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
})

/* Delete Member */
router.delete('/:id', (req, res) => {
  // res.send(req.params.id) this will just show a number on the page

  const found = members.some(member => member.id === parseInt(req.params.id)) // this will check if there's a member with the given id

  if (found) { // if it exists
    res.json({ msg: `Member with id: ${req.params.id}, has been deleted`,
      members: members.filter(member => {
      /**
       * keep in mind that the req.params returns it as a string while our member obj.id is a number
       * otherwise it will return an empty array
       * this will filter out the member from the 'database'
       */
      return member.id !== parseInt(req.params.id) // we use .params to utilize the params id for this case
    })})
  } else { // we give a 400 status because there isnt a member with that id
    res.status(400).json({msg: `No member with the id of ${req.params.id}`}) 
  }
})

module.exports = router;