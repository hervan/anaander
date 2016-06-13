var Board = (function () {
    function Board(size) {
        this.meepleSpread = 0.1;
        this.citySpread = 0.02;
        this.size = size;
        for (var x = 0; x < this.size.x; x++) {
            for (var y = 0; y < this.size.y; y++) {
                var tile = new Tile(new Vector(x, y));
                if (Math.random() < this.meepleSpread) {
                    tile.meeples.push(new Meeple(Color.Neutral, tile));
                }
                if (Math.random() < this.citySpread) {
                    tile.city = new City();
                }
                this.tileMap[x][y] = tile;
            }
        }
        for (var x = 0; x < this.size.x; x++) {
            for (var y = 0; y < this.size.y; y++) {
                if (y > 0) {
                    this.tileMap[x][y].neighbours[Direction.Up] = this.tileMap[x][y - 1];
                }
                else {
                    this.tileMap[x][y].neighbours[Direction.Up] = null;
                }
                if (x > 0) {
                    this.tileMap[x][y].neighbours[Direction.Left] = this.tileMap[x - 1][y];
                }
                else {
                    this.tileMap[x][y].neighbours[Direction.Left] = null;
                }
                if (y + 1 < this.size.y) {
                    this.tileMap[x][y].neighbours[Direction.Down] = this.tileMap[x][y + 1];
                }
                else {
                    this.tileMap[x][y].neighbours[Direction.Down] = null;
                }
                if (x + 1 < this.size.x) {
                    this.tileMap[x][y].neighbours[Direction.Right] = this.tileMap[x + 1][y];
                }
                else {
                    this.tileMap[x][y].neighbours[Direction.Right] = null;
                }
            }
        }
    }
    Board.prototype.tile = function (position) {
        return this.tileMap[position.x][position.y];
    };
    return Board;
}());
//# sourceMappingURL=board.js.map