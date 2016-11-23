var express = require('express'), http = require('http'), path = require('path'), fs = require('fs');

var app = express();

var server = http.createServer(app);

var io = require('socket.io')(server);

// all environments
app.set('port', process.env.PORT || 3000);


io.on('connection', function (socket) {
	socket.on('join', function (data) {
		socket.join(data);
		console.log(data);
	});
});




app.post('/message/', function(request, response){

	var responseBody = {};

	io.sockets.emit('userInteraction', { board: request.param.beaconId, details: request.body});
	responseBody.status = "Emitted";
	response.setHeader('Content-Type', 'application/json');
	response.write(JSON.stringify(responseBody));
	response.end();
	return;


});






server.listen(app.get('port'), '0.0.0.0', function() {
	console.log('Express server listening on port ' + app.get('port'));
});


