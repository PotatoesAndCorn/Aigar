var objectslib = require('./objects.js');

var Vec2 = require('vec2');
var Quadtree2 = require('quadtree2');
var mathlib = require('./math.js');
var Vector2 = mathlib.Vector2;


var BlobObject = objectsLib.BlobObject;
var CellObject = objectsLib.CellObject;

function World(x, y) {
    if(x == null){x = 1000;}
    if(y == null){y = 1000;}
    this.foods = new Array(); //  array of BlobObjects
    this.players = new Array(); //  array of CellObjects
    this.x_max = x / 2;
    this.x_min = -x / 2;
    this.y_max = y / 2;
    this.y_min = -y / 2;

    this.getCollisions = function() {
        return getCollisionsFromQuad(x,y, foods, players);
    };

    this.updatePositions = function() {
        for (var i = 0; i < this.players.length; ++i) {
            var playerElt = this.players[i];

            if (playerElt.velocity.lengthSquared() === 0) {
                continue;
            }

            playerElt.position = playerElt.position.add(playerElt.velocity);
        }
    };

    this.tick = function() {
        this.updatePositions();

        var collisionPairs = this.getCollisions();
        for (var i = 0; i < collisionPairs.length; ++i) {
            var collisionElt = collisionPairs[i];
        }
    }
}

function getCollisionsFromQuad(x, y, foods, players)
{   
    // This will initialize a quadtree with a x*y resolution, 
    // with an object limit of 3 inside a quadrant. 
    quadtree = new Quadtree2(new Vec2(x, y), 3),
    
    itemstoadd = new Array();
    for(entity in foods)
    {
        itemstoadd.push(
            {
                pos_: new Vec2(entity.position.x, entity.position.y),
                rad_: entity.size*entity.size
            });
    }
   
    // Add all of our beloved character to the quadtree. 
    quadtree.addObjects(itemstoadd);
    pairs = new Array();
    for(item in itemstoadd)
    {
        coll = quadtree.getCollisionsForObjects(item);
        console.log(coll);
        //pairs.push({a:coll.pos_, b:_id2});
    }
}

module.exports.World = World;
//create some characters 

World.food.push(new BlobObject(10, new Vector2(500,650)));
World.food.push(new BlobObject(50, new Vector2(500,650)));
World.food.push(new BlobObject(20, new Vector2(300,567)));
World.food.push(new BlobObject(15, new Vector2(700,780)));
World.food.push(new BlobObject(12, new Vector2(230,230)));
World.food.push(new BlobObject(7, new Vector2(540,523)));
World.food.push(new BlobObject(8, new Vector2(450,300)));
World.food.push(new BlobObject(12, new Vector2(345,550)));

console.log(World.getCollisions());













