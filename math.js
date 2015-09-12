// A 2D vector.
function Vector2(x = 0, y = 0) {
	this.x = x;
	this.y = y;
}

// Returns the sum of the vector with another vector.
Vector2.prototype.add = function(v) {
	return new Vector2(this.x + v.x, this.y + v.y);
}

// Returns the difference of the vector with another vector.
Vector2.prototype.sub = function(v) {
	return new Vector2(this.x - v.x, this.y - v.y);
}

// Returns the vector scaled by a factor.
Vector2.prototype.scale = function(s) {
	return new Vector2(this.x * s, this.y * s);
}

// Returns the dot product of the vector with another vector.
Vector2.prototype.dot = function(v) {
	return this.x * v.x + this.y * v.y;
}

// Gets the squared length of the vector.
Vector2.prototype.lengthSquared = function() {
	return this.x * this.x + this.y * this.y;
}

// Gets the length of the vector.
Vector2.prototype.length = function() {
	return Math.sqrt(this.lengthSquared());
}

// Returns a normalized copy of the vector.
Vector2.prototype.normalize = function() {
	var length = this.length();
	return new Vector2(this.x / length, this.y / length);
}

module.exports.Vector2 = Vector2
