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

                this.tileMap[x].push(tile);
            }
        }
        
        for (var x = 0; x < this.size.x; x++) {
            for (var y = 0; y < this.size.y; y++) {

                if (Math.random() < this.meepleSpread) {

                    this.tileMap[x][y].push(new Meeple(Color.Neutral, this.tileMap[x][y], anaander));
                }

                if (Math.random() < this.citySpread) {

                    this.tileMap[x][y].city = new City();
                }
                
                this.tileMap[x][y].sprite.frame = this.tileMap[x][y].city == null ? 9 : 8;

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