// import package
// express
const express = require('express');
// body-parser
const bodyParser = require('body-parser');

// import config
const config = require('./config/config.json');

// create express application
const app = express();

// create a middleware to get bodyparser json object
app.use(bodyParser.json()); //request.body
app.use(bodyParser.urlencoded({ extended: true })); //Eg. To access job_id and filters in url htpss:localhost:3000/?job_id=1&filters=1

// add custom middleware
app.use((request, response, next) => {
    // log the message, Custom middleware run
    console.log("Middleware Run");
    // call the next middleware
    next();
});

// set root route
app.get('/', (request, response) => {
    // send message hello world
    return response.send('Welcome to MEAN stack app');
});


//listen the express app to port 3000
app.listen('3000', () => {
    console.log('Application is running port 3000')
});