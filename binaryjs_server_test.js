var BinaryServer = require("binaryjs").BinaryServer;
var fs = require("fs");

var server = BinaryServer({port: 9000});
server.on("connection", function(client) {
	var file = fs.createReadStream(__dirname + '/linux.png');
	client.send(file);
});