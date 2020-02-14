// const logger = require('./middleware/logger') -> wont don't really need this, it was jsut an example of using middleware
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const members = require("./Members.js")

const app = express();

/* Handlebars Middleware */
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json())
// this will handle form submissions; url encoded data
app.use(express.urlencoded({ extended: false }));

/**
 * the Homepage Route is what renders first before the static files
 */

// Homepage Route
app.get('/', (req, res) => res.render('index', {
  title: "Member App",
  members: members
}))

app.get('/create-new-member', (req, res) => res.render('createNewMember', {
  title: "Create New Member Page",
  members: members
}))


// this is to serve static files
// Setting the static folder
app.use(express.static(path.join(__dirname, 'public')))

// this isn't ideal because we have to create a route for each page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

/**
 * /api/members is the parent route
 */
// these are the members API routes
app.use('/api/members', require('./routes/api/members'));
/**
 * 
 * this is an example 
     app.get('/', (req, res) => {
       res.send("Hello World!!!!")
     })
 */

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server started on ${PORT}`))