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

module.exports = {
    BlobObject: BlobObject,
    CellObject: CellObject
}