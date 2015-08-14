module.exports = function(app) {

var html = './public/views/';

app.get("*", function(req,res,next){

	res.sendfile('./public/views/home.html');

 });
}