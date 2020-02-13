const moment = require('moment') // this is to Parse, validate, manipulate, and display dates in javascript. 

// a simple middlewar function
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`) // this will give us the whole url with the date that it sends
  next();
}

module.exports = logger