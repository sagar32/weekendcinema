var express = require('express')
  , app = express(); // Web framework to handle routing requests


  
var port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app/partials'));
	
app.get("*", function(req,res,next){

	res.sendFile(__dirname+'/index.html');

 });

app.listen(port);
console.log('Weekend Cinema UI server listening on '+port);