// Client information packet sent on connect.
//
// Attributes:
// - name = The client's display name
var PACKET_TYPE_CLIENT_INFO = 1;

// Empty packet which confirms that a client has finished connecting.
var PACKET_TYPE_CLIENT_CONNECTED = 2;

// Main object for connecting to a server.
function Client() {
	this._onConnected = [];
	this._onDisconnected = [];
	this._client = null;
}

// Connects the client to a server.
Client.prototype.connect = function(serverUrl, info) {
	if (this._client)
		return;

	this._client = new BinaryClient(serverUrl);

	// Register to send the info packet once the connection opens
	this._client.on("open", function() {
		this.send(PACKET_TYPE_CLIENT_INFO, info);
	}.bind(this));

	// Packet handling
	this._client.on("stream", function(stream, meta) {
		stream.on("data", function(data) {
			this._packetReceived(data, meta);
		}.bind(this));
	}.bind(this));
}

// Disconnects the client.
Client.prototype.disconnect = function() {
	if (this._client)
		this._client.close();
}

// Adds a function to be called when the client connects to a server.
Client.prototype.addConnectedListener = function(func) {
	this._onConnected.push(func);
}

// Adds a function to be called when the client disconnects from a server.
Client.prototype.addDisconnectedListener = function(func) {
	this._onDisconnected.push(func);
}

// Sends a packet to the server.
// Returns true on success and false otherwise.
Client.prototype.send = function(packetType, packet) {
	if (!this._client)
		return false;
	this._client.send(packet, { type: packetType });
	return true;
}

Client.prototype._packetReceived = function(data, meta) {
	if (meta == null || !("type" in meta))
		return; // Bad packet
	switch (meta.type) {
		case PACKET_TYPE_CLIENT_CONNECTED:
			this._connected();
			break;
		default:
			console.warn("Discarding packet of unsupported type " + meta.type);
			break;
	}
}

Client.prototype._connected = function() {
	console.log("Received connection confirmation packet");

	// Signal connect handlers
	this._onConnected.forEach(function (f) { f(); });

	// Signal disconnect handlers on close
	this._client.on("close", function() {
		this._client = null;
		this._onDisconnected.forEach(function (f) { f(); });
	}.bind(this));
}