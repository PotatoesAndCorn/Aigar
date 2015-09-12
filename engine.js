var objectslib = require('./objects.js');
var BlobObject = objectsLib.BlobObject;
var CellObject = objectsLib.CellObject;

var mathlib = require('./math.js');
var Vector2 = mathlib.Vector2;

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
        for (var i = 0; i < this.players.length; ++i) {
            var playerElt = this.players[i];

            playerElt.
        }
    };

    this.tick = function() {
        this.updatePositions();

        var collisionPairs = this.getCollisions();
    }
}

module.exports.World = World;
