var Tile = (function () {
    function Tile(position, anaander) {
        this.position = position;
        this.meeples = new Array();
        this.neighbours = new Array();
        this.sprite = anaander.game.add.sprite(this.position.x * anaander.tileSize.x, this.position.y * anaander.tileSize.y, 'tiles');
    }
    Tile.prototype.neighbour = function (direction) {
        return this.neighbours[direction];
    };
    return Tile;
}());
//# sourceMappingURL=tile.js.map