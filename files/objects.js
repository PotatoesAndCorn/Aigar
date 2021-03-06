// Base object for all game entities.
function BlobObject(size, position) {
	this.size = size;
	this.position = position;
}

// A blob with a name and a velocity.
// Extends BlobObject.
function CellObject(name, velocity, size, position) {
	BlobObject.call(this, size, position);

	this.name = name;
	this.velocity = velocity;
}
CellObject.prototype = Object.create(BlobObject.prototype);
CellObject.prototype.constructor = BlobObject;

// A cell which is controlled by the client.
// Extends CellObject.
function PlayerCellObject(index, name, velocity, size, position) {
	CellObject.call(this, name, velocity, size, position);

	this.index = index;
}
PlayerCellObject.prototype = Object.create(CellObject.prototype);
PlayerCellObject.prototype.constructor = CellObject;

// Accelerates a player in a direction.
PlayerCellObject.prototype.accelerate = function(dir, proportion) {
	// TODO: Implement
}

// Splits off a new PlayerCellObject and returns it.
PlayerCellObject.prototype.split = function(dir, mass) {
	// TODO: Implement
	return null;
}
