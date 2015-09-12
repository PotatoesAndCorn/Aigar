
function World(x = 1000, y = 1000) {
    this.foods = new Array();
    this.players = new Array();
    this.x_max = x / 2;
    this.x_min = -x / 2;
    this.y_max = y / 2;
    this.y_min = -y / 2;

    this.getCollisions = function() {

    };

    this.updatePositions = function() {

    };

    this.tick = function() {
        
    }
}

module.exports.World = World;
