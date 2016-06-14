class Tile {

    position: Vector;

    meeples: Meeple[];

    city: City;

    neighbours: Tile[];
    
    sprite: Phaser.Sprite;

    constructor(position: Vector, anaander: Anaander) {

        this.position = position;
        this.meeples = new Array();
        this.neighbours = new Array();
        
        this.sprite = anaander.game.add.sprite(this.position.x * anaander.tileSize.x, this.position.y * anaander.tileSize.y, 'tiles');
    }

    neighbour(direction: Direction): Tile {

        return this.neighbours[direction];
    }
}