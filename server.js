var express = require('express'); // ExperssJS Framework
var app = express(); // Invoke express to variable for use in a
var port = process.env.PORT || 8081;
var morgan = require('morgan'); // Import Morgan Package
var mongoose = require('mongoose'); // HTTP request logger middleware for Node.js
var router = express.Router(); // Invoke the Express Router
var appRoutes = require('./app/routes/api')(router); 
var bodyParser = require('body-parser'); 
var path = require('path');

app.use(morgan('dev')); // Morgan Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // Allow front end to access public folder
app.use('/api',appRoutes); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )

 //mongoose.connect('mongodb://localhost:27017/Vict',function(err) {
	mongoose.connect('mongodb://aisu:aisu@ds113826.mlab.com:13826/vict',function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
    }
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // Set index.html as layout
});


// Start Server
app.listen(port, function() {
    console.log('Running the server on port ' + port); // Listen on configured port
});



// var User = require('./app/models/user');
