var objectslib = require('./objects.js');
var BlobObject = objectsLib.BlobObject;
var CellObject = objectsLib.CellObject;

function World(x = 1000, y = 1000) {
    this.foods = new Array(); //  array of BlobObjects
    this.players = new Array(); //  array of CellObjects
    this.x_max = x / 2;
    this.x_min = -x / 2;
    this.y_max = y / 2;
    this.y_min = -y / 2;

    this.getCollisions = function() {

    };

    this.updatePositions = function() {

    };

    this.tick = function() {
        var collisionPairs = this.getCollisions();
    }
}

module.exports.World = World;
