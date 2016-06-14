class Board {

    tileMap: Tile[][];
    meepleSpread: number = 0.1;
    citySpread: number = 0.025;
    size: Vector;

    constructor(anaander: Anaander) {

        this.size = anaander.boardSize;
        
        this.tileMap = new Array();
        for (var x = 0; x < this.size.x; x++) {
            
            this.tileMap.push(new Array());
            for (var y = 0; y < this.size.y; y++) {

                var tile = new Tile(new Vector(x, y), anaander);

                if (Math.random() < this.meepleSpread) {

                    tile.meeples.push(new Meeple(Color.Neutral, tile, anaander));
                }

                if (Math.random() < this.citySpread) {

                    tile.city = new City();
                }
                
                tile.sprite.frame = tile.city == null ? 9 : 8;

                this.tileMap[x].push(tile);
            }
        }

        for (var x = 0; x < this.size.x; x++) {
            for (var y = 0; y < this.size.y; y++) {

                if (y > 0) {
                    this.tileMap[x][y].neighbours.push(this.tileMap[x][y - 1]);
                }
                else {
                    this.tileMap[x][y].neighbours.push(null);
                }

                if (x > 0) {
                    this.tileMap[x][y].neighbours.push(this.tileMap[x - 1][y]);
                }
                else {
                    this.tileMap[x][y].neighbours.push(null);
                }

                if (y + 1 < this.size.y) {
                    this.tileMap[x][y].neighbours.push(this.tileMap[x][y + 1]);
                }
                else {
                    this.tileMap[x][y].neighbours.push(null);
                }

                if (x + 1 < this.size.x) {
                    this.tileMap[x][y].neighbours.push(this.tileMap[x + 1][y]);
                }
                else {
                    this.tileMap[x][y].neighbours.push(null);
                }
            }
        }
    }

    tile(position: Vector): Tile {

        return this.tileMap[position.x][position.y];
    }
}