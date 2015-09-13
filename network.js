var util = require("util");
var EventEmitter = require("events").EventEmitter;
var BinaryServer = require("binaryjs").BinaryServer;

// Client information packet sent on connect.
//
// Attributes:
// - name = The client's display name
var PACKET_TYPE_CLIENT_INFO = 1;

// Empty packet which confirms that a client has finished connecting.
var PACKET_TYPE_CLIENT_CONNECTED = 2;

// Associates a client ID with an information blob.
function ConnectedClient(id, binClient, info) {
	this.id = id;
	this.info = info;
	this._client = binClient;
}

// Sends a packet to the client.
ConnectedClient.prototype.send = function(packetType, packet) {
	this._client.send(packet, { type: packetType });
}

// Main server class.
function Server(port) {
	EventEmitter.call(this);

	if (port == null) port = 9845;
	
	this.clients = [];

	this._server = new BinaryServer({port: port});
	this._clientsById = {};
	this._nextClientId = 0;
}
util.inherits(Server, EventEmitter);

Server.prototype.start = function() {
	// Client connection handling
	this._server.on("connection", this._connectClient.bind(this));
}

// Attempts to find the client associated with an ID.
// Returns the ConnectedClient object on success or null otherwise.
Server.prototype.findClient = function(clientId) {
	if (clientId in this._clientsById)
		return this._clientsById[clientId];
	return null;
}

// Sends a packet to a client.
// Returns true on success or false otherwise.
Server.prototype.send = function(clientId, packetType, data) {
	var client = this.findClient(clientId);
	if (!client)
		return false;
	client.send(packetType, data);
	return true;
}

Server.prototype._connectClient = function(binClient) {
	// Get a unique ID for the client
	var clientId = this._nextClientId++;

	// Packet handling
	binClient.on("stream", function(stream, meta) {
		stream.on("data", function(data) {
			this._packetReceived(clientId, binClient, data, meta);
		}.bind(this));
	}.bind(this));

	// Disconnection handling
	binClient.on("close", function() {
		this._disconnectClient(clientId);
	}.bind(this));
}

Server.prototype._disconnectClient = function(clientId) {
	console.log("Received disconnection notice from client " + clientId);

	var client = this.findClient(clientId);
	if (!client) {
		return;
	}

	// Signal a "disconnection" event first
	this.emit("disconnection", client);

	// Unregister it
	var index = this.clients.indexOf(client);
	if (index >= 0)
		this.clients.splice(index, 1);
	delete this._clientsById[clientId];

	console.log("Client " + clientId + " disconnected.");
}

Server.prototype._packetReceived = function(clientId, binClient, data, meta) {
	if (meta == null || !("type" in meta))
		return; // Bad packet
	switch (meta.type) {
		case PACKET_TYPE_CLIENT_INFO:
			this._clientInfoPacketReceived(clientId, binClient, data);
			break;
		default:
			console.warn("Discarding packet of unsupported type " + meta.type);
			break;
	}
}

Server.prototype._clientInfoPacketReceived = function(clientId, binClient, data) {
	console.log("Received info packet from client " + clientId);

	if (this.findClient(clientId)) {
		console.error("Client " + clientId + " is already established - ignoring");
		return;
	}

	// Add data for the client
	var client = new ConnectedClient(clientId, binClient, data);
	this.clients.push(client);
	this._clientsById[clientId] = client;
	console.log("Registered client " + clientId);

	// Signal a "connection" event
	this.emit("connection", client);

	// Notify the client that they've finished connecting
	client.send(PACKET_TYPE_CLIENT_CONNECTED, {});
}

module.exports = {
	Server: Server,
	ConnectedClient: ConnectedClient
}

var testServer = new Server();
testServer.on("connection", function(client) {
	console.log("Client " + client.id + " connected with name \"" + client.info.name + "\"!");
});
testServer.on("disconnection", function(client) {
	console.log("Client \"" + client.info.name + "\" disconnected!");
});
testServer.start();