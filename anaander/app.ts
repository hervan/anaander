enum Color {

    Neutral,
    Red,
    Green,
    Blue
}

enum Direction {

    Up,
    Left,
    Down,
    Right
}

class Vector {

    x: number;
    y: number;

    constructor(x: number, y: number) {

        this.x = x;
        this.y = y;
    }
}

class Anaander {

    game: Phaser.Game;
    
    tileSize: Vector;
    boardSize: Vector;

    playerCount: number;
    players: Player[];

    board: Board;

    constructor() {
        
        /*this.game.state.add("SetupScreen", SetupScreenState, false);
        tihs.game.state.add("GameplayState", GameplayState, false);
        this.game.state.start("SetupScreen", false, false);*/
        
        this.game = new Phaser.Game(1200, 800,
            Phaser.AUTO, 'content', {
                preload: this.preload, create: this.create, update: this.update, render: this.render
            });
    }

    preload() {
        
        this.game.load.spritesheet('tiles', 'tiles.png', 40, 40);
    }

    create() {
        
        this.playerCount = 1;
        this.players = new Array();

        this.tileSize = new Vector(40, 40);
        this.boardSize = new Vector(Math.floor(1200 / this.tileSize.x), Math.floor(800 / this.tileSize.y));

        this.board = new Board(this);
        
        for (var i = 1; i <= this.playerCount; i++) {

            var baseTile: Tile;
            do {
                baseTile = this.board.tile(new Vector(
                    Math.floor(Math.random() * this.boardSize.x),
                    Math.floor(Math.random() * this.boardSize.y)));
            } while (baseTile.meeples.length > 0);

            var baseMeeple = new Meeple(i, baseTile, this);
            baseTile.meeples.push(baseMeeple);

            this.players.push(new Player(i, baseMeeple));
        }
    }

    update() {

    }
    
    render() {
        
    }
}

window.onload = () => {

    var game = new Anaander();
};