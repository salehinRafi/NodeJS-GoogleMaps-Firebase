// import package
// express
const express = require('express');
// body-parser
const bodyParser = require('body-parser');

// import config
//const config = require('./config/config.json');

var location = require("./routes/location");

// create express application
const app = express();

// create a middleware to get bodyparser json object
app.use(express.static(__dirname));
app.use(bodyParser.json()); //request.body
app.use(bodyParser.urlencoded({ extended: true }));

// add custom middleware
app.use((request, response, next) => {
    // log the message, Custom middleware run
    console.log("Middleware Run");
    // call the next middleware
    next();
});
app.use("/location", location);

// set root route
app.get('/', (request, response) => {
    console.log("Initialize Index.html")
    response.sendfile('index.html');
});

//listen the express app to port 3000
app.listen('3000', () => {
    console.log('Application is running port 3000')
});