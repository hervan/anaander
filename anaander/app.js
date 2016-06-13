var Color;
(function (Color) {
    Color[Color["Neutral"] = 0] = "Neutral";
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var State;
(function (State) {
    State[State["Front"] = 0] = "Front";
    State[State["Back"] = 1] = "Back";
})(State || (State = {}));
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Left"] = 1] = "Left";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
var Anaander = (function () {
    function Anaander() {
        this.screenSize = new Vector(1200, 800);
        this.tileSize = new Vector(40, 40);
        this.playerCount = 1;
        this.players = [];
        var state = State.Front;
        var newState = !state;
        var newerState = !newState;
        this.game = new Phaser.Game(this.screenSize.x, this.screenSize.y, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
        this.boardSize = new Vector(Math.floor(this.screenSize.x / this.tileSize.x), Math.floor(this.screenSize.y / this.tileSize.y));
    }
    Anaander.prototype.preload = function () {
        this.game.load.image('sprites', 'tiles.png');
        //this.sprite = this.game.load.spritesheet('sprites', 'tiles.png', 40, 40);
    };
    Anaander.prototype.create = function () {
        this.board = new Board(this.boardSize);
        for (var i = 1; i <= this.playerCount; i++) {
            var baseTile;
            do {
                baseTile = this.board.tile(new Vector(Math.floor(Math.random() * this.boardSize.x), Math.floor(Math.random() * this.boardSize.y)));
            } while (baseTile.meeples.length > 0);
            var baseMeeple = new Meeple(i, baseTile);
            baseTile.meeples.push(baseMeeple);
            this.players.push(new Player(i, baseMeeple));
        }
    };
    Anaander.prototype.update = function () {
    };
    return Anaander;
}());
window.onload = function () {
    var game = new Anaander();
};
//# sourceMappingURL=app.js.map