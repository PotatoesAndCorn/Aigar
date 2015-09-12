// A 2D vector.
function Vector2(x = 0, y = 0) {
	this.x = x;
	this.y = y;
}

// (STATIC) Takes the dot product of two vectors.
Vector2.dot = function(v1, v2) {
	return v1.x * v2.x + v1.y * v2.y;
}

// Gets the squared length of a vector.
Vector2.prototype.lengthSquared = function() {
	return this.x * this.x + this.y * this.y;
}

// Gets the length of a vector.
Vector2.prototype.length = function() {
	return Math.sqrt(this.lengthSquared());
}

// Returns a normalized copy of a vector.
Vector2.prototype.normalize = function() {
	var length = this.length();
	return new Vector2(this.x / length, this.y / length);
}

module.exports.Vector2 = Vector2
