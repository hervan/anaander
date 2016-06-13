var Meeple = (function () {
    function Meeple(color, tile) {
        this.color = color;
        this.tile = tile;
        this.state = State.Front;
    }
    Meeple.prototype.move = function (direction, state) {
        var to = this.tile.neighbour(direction);
    };
    return Meeple;
}());
//# sourceMappingURL=meeple.js.map