// Data passed to tick handlers.
function TickData(source) {
	this.source = source; // The PlayerCellObject that the tick affects.
	this.knownBlobs = []; // Known blob information. Empty if ate or eatenBy are not null
	this.ate = null;      // If not null, then the player ate this cell.
	this.eatenBy = null;  // If not null, then the player was eaten by this cell.
}

module.exports.TickData = TickData;
