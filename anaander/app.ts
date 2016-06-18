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
    currentPlayer: Color;

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
        
        this.playerCount = 2;
        this.players = new Array();
        this.currentPlayer = Color.Red;

        this.tileSize = new Vector(40, 40);
        this.boardSize = new Vector(Math.trunc(1200 / this.tileSize.x), Math.trunc(800 / this.tileSize.y));

        this.board = new Board(this);
        
        for (var i = 1; i <= this.playerCount; i++) {

            var baseTile: Tile;
            do {
                baseTile = this.board.tile(new Vector(
                    Math.trunc(Math.random() * this.boardSize.x),
                    Math.trunc(Math.random() * this.boardSize.y)));
            } while (baseTile.meeples.length > 0);

            var baseMeeple = new Meeple(i, baseTile, this);
            baseTile.push(baseMeeple);

            this.players.push(new Player(i, baseMeeple));
        }

        this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
            .onDown.add(() => {
                if (this.game.tweens.getAll().length == 0) {

                    this.players[this.currentPlayer - 1].move(Direction.Up);
                    this.currentPlayer = (this.currentPlayer % this.playerCount) + 1;

                    this.players[this.currentPlayer - 1].meeples.forEach((meeple) => {

                        meeple.tween = this.game.add.tween(meeple.sprite.scale)
                            .from({ x: 0.6, y: 0.6 }, 100, Phaser.Easing.Default, true, 200);
                    });
                }
            });

        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
            .onDown.add(() => {
                if (this.game.tweens.getAll().length == 0) {

                    this.players[this.currentPlayer - 1].move(Direction.Left);
                    this.currentPlayer = (this.currentPlayer % this.playerCount) + 1;

                    this.players[this.currentPlayer - 1].meeples.forEach((meeple) => {

                        meeple.tween = this.game.add.tween(meeple.sprite.scale)
                            .from({ x: 0.6, y: 0.6 }, 100, Phaser.Easing.Default, true, 200);
                    });
                }
            });

        this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
            .onDown.add(() => {
                if (this.game.tweens.getAll().length == 0) {

                    this.players[this.currentPlayer - 1].move(Direction.Down);
                    this.currentPlayer = (this.currentPlayer % this.playerCount) + 1;

                    this.players[this.currentPlayer - 1].meeples.forEach((meeple) => {

                        meeple.tween = this.game.add.tween(meeple.sprite.scale)
                            .from({ x: 0.6, y: 0.6 }, 100, Phaser.Easing.Default, true, 200);
                    });
                }
            });

        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
            .onDown.add(() => {
                if (this.game.tweens.getAll().length == 0) {

                    this.players[this.currentPlayer - 1].move(Direction.Right);
                    this.currentPlayer = (this.currentPlayer % this.playerCount) + 1;

                    this.players[this.currentPlayer - 1].meeples.forEach((meeple) => {

                        meeple.tween = this.game.add.tween(meeple.sprite.scale)
                            .from({ x: 0.6, y: 0.6 }, 100, Phaser.Easing.Default, true, 200);
                    });
                }
            });
    }

    update() {
        
    }
    
    render() {
        
    }
}

window.onload = () => {

    var game = new Anaander();
};