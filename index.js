const express = require('express');
const path = require('path');
const logger = require('./middleware/logger')
const app = express();


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