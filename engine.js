var objectslib = require('./objects.js');

var Vec2 = require('vec2');
var Quadtree2 = require('quadtree2');
var mathlib = require('./math.js');
var Vector2 = mathlib.Vector2;


var BlobObject = objectslib.BlobObject;
var CellObject = objectslib.CellObject;

function World(x, y) {
    if(x == null){x = 1000;}
    if(y == null){y = 1000;}
    this.x = x;
    this.y = y;
    this.food = new Array(); //  array of BlobObjects
    this.players = new Array(); //  array of CellObjects
    this.x_max = x / 2;
    this.x_min = -x / 2;
    this.y_max = y / 2;
    this.y_min = -y / 2;
}

World.prototype.combine(cellA, cellB) {
    // TODO
    // notify eater of combine
}

World.prototype.eatCell(eater, eatee) {
    if (eatee instanceof CellObject) {
        for (var i = 0; i < this.players.length; ++i) {
            var playerElt = this.players[i];

            if (playerElt === eatee) {
                this.players = this.players.splice(i, 1);
                // notify eatee of eat
                // notify eater of eat
                break;
            }
        }
    } else {
        for (var i = 0; i < this.food.length; ++i) {
            var foodElt = this.food[i];

            if (foodElt === eatee) {
                this.food = this.food.splice(i, 1);
                // notify eater of eat
                break;
            }
        }
    }
}

World.prototype.getCollisions = function() {
    return getCollisionsFromQuad(this.x, this.y, this.food, this.players);
}

World.prototype.updatePositions = function() {
    for (var i = 0; i < this.players.length; ++i) {
        var playerElt = this.players[i];

        if (playerElt.velocity.lengthSquared() === 0) {
            continue;
        }

        playerElt.position = playerElt.position.add(playerElt.velocity);
    }
}

World.prototype.tick = function() {
        this.updatePositions();
        var collisionPairs = getCollisions();

        for (var i = 0; i < collisionPairs.length; ++i) {
            var collisionElt = collisionPairs[i];
            var a = collisionElt.a;
            var b = collisionElt.b;

            // make sure a is larger than b
            if (a.size < b.size) {
                var c = a;
                a = b;
                b = c;
            }

            if (a instanceof CellObject) {
                if (b instanceof CellObject && a.player === b.player) {
                    if (eatee.combineDelay === 0 && eater.combineDelay === 0) {
                        combine(eater, eatee);
                    }
                }
                if (a.size >= 1.5 * b.size) {
                    eatCell(b, a);
                }
            }
        }
    }
}

function getCollisionsFromQuad(x, y, foods, players)
{
    // This will initialize a quadtree with a x*y resolution,
    // with an object limit of 4 inside a quadrant.
    var quadtree = new Quadtree2({ size: new Vec2(x, y) });

    var itemstoadd = new Array();
    for(var i=0; i<foods.length; i++)
    {
        var entity = foods[i];
        itemstoadd.push(quadtree.addObject(
            {
                pos: new Vec2(entity.position.x, entity.position.y),
                rad: Math.sqrt(entity.size),
                obj: entity
            }));
    }

    var pairs = new Array();
    for(var i=0; i<itemstoadd.length; ++i)
    {
        var item = itemstoadd[i];
        var coll = quadtree.getCollidings(item);
        var kez = Object.keys(coll);
        if(kez.length !== 0 && kez != null)
        {
            //console.log(kez);
            //console.log(coll[kez[0]]);
            for(var j=0; j<kez.length; j++)
                pairs.push({a:item["obj"], b:coll[kez[j]]["obj"]});
        }
        else
            continue;

    }
    return pairs;
}

module.exports.World = World;

g_World = new World();
//create some characters

for(var i=0; i<200; i++)
{
    g_World.food.push(new BlobObject(Math.random()*100, new Vector2(Math.random()*1000,Math.random()*1000)));
}
g_World.food.push(new BlobObject(50, new Vector2(500,650)));
g_World.food.push(new BlobObject(20, new Vector2(300,567)));
g_World.food.push(new BlobObject(15, new Vector2(700,780)));
g_World.food.push(new BlobObject(12, new Vector2(230,230)));
g_World.food.push(new BlobObject(7, new Vector2(540,523)));
g_World.food.push(new BlobObject(8, new Vector2(450,300)));
g_World.food.push(new BlobObject(12, new Vector2(345,550)));

console.log(g_World.getCollisions());
