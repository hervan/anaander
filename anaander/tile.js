var Tile = (function () {
    function Tile(position) {
        this.position = position;
    }
    Tile.prototype.neighbour = function (direction) {
        return this;
    };
    return Tile;
}());
//# sourceMappingURL=tile.js.map