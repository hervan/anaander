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

    screenSize: Vector = new Vector(1200, 800);
    tileSize: Vector = new Vector(40, 40);

    boardSize: Vector;

    playerCount: number = 1;

    players = [];

    board: Board;

    constructor() {

        this.game = new Phaser.Game(this.screenSize.x, this.screenSize.y, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });

        this.boardSize = new Vector(Math.floor(this.screenSize.x / this.tileSize.x), Math.floor(this.screenSize.y / this.tileSize.y));
    }

    preload() {

        //this.game.load.image('sprites', 'tiles.png');
        //this.sprite = this.game.load.spritesheet('sprites', 'tiles.png', 40, 40);
    }

    create() {

        this.board = new Board(this.boardSize);

        for (var i = 1; i <= this.playerCount; i++) {

            var baseTile: Tile;
            do {
                baseTile = this.board.tile(new Vector(
                    Math.floor(Math.random() * this.boardSize.x),
                    Math.floor(Math.random() * this.boardSize.y)));
            } while (baseTile.meeples.length > 0);

            var baseMeeple = new Meeple(i, baseTile);
            baseTile.meeples.push(baseMeeple);

            this.players.push(new Player(i, baseMeeple));
        }
    }

    update() {

    }
}

window.onload = () => {

    var game = new Anaander();
};