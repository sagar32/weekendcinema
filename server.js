var express = require('express')
  , app = express() // Web framework to handle routing requests
  , routes = require('./routes')// Routes for our application

  var path    = require("path");
  
var port = process.env.PORT || 3000;


app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/views'));
	
// Application routes
routes(app);

app.listen(port);
console.log('Weekend Cinema UI server listening on '+port);