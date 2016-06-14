var Color;
(function (Color) {
    Color[Color["Neutral"] = 0] = "Neutral";
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
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
        /*this.game.state.add("SetupScreen", SetupScreenState, false);
        tihs.game.state.add("GameplayState", GameplayState, false);
        this.game.state.start("SetupScreen", false, false);*/
        this.game = new Phaser.Game(1200, 800, Phaser.AUTO, 'content', {
            preload: this.preload, create: this.create, update: this.update, render: this.render
        });
    }
    Anaander.prototype.preload = function () {
        this.game.load.spritesheet('tiles', 'tiles.png', 40, 40);
    };
    Anaander.prototype.create = function () {
        this.playerCount = 1;
        this.players = new Array();
        this.tileSize = new Vector(40, 40);
        this.boardSize = new Vector(Math.floor(1200 / this.tileSize.x), Math.floor(800 / this.tileSize.y));
        this.board = new Board(this);
        for (var i = 1; i <= this.playerCount; i++) {
            var baseTile;
            do {
                baseTile = this.board.tile(new Vector(Math.floor(Math.random() * this.boardSize.x), Math.floor(Math.random() * this.boardSize.y)));
            } while (baseTile.meeples.length > 0);
            var baseMeeple = new Meeple(i, baseTile, this);
            baseTile.meeples.push(baseMeeple);
            this.players.push(new Player(i, baseMeeple));
        }
    };
    Anaander.prototype.update = function () {
    };
    Anaander.prototype.render = function () {
    };
    return Anaander;
}());
window.onload = function () {
    var game = new Anaander();
};
var Board = (function () {
    function Board(anaander) {
        this.meepleSpread = 0.1;
        this.citySpread = 0.025;
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
        /*for (var x = 0; x < this.size.x; x++) {
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
        }*/
    }
    Board.prototype.tile = function (position) {
        return this.tileMap[position.x][position.y];
    };
    return Board;
}());
var City = (function () {
    function City() {
        this.color = Color.Neutral;
    }
    return City;
}());
var Meeple = (function () {
    function Meeple(color, tile, anaander) {
        this.color = color;
        this.tile = tile;
        this.state = true;
        this.sprite = anaander.game.add.sprite(this.tile.position.x * anaander.tileSize.x, this.tile.position.y * anaander.tileSize.y, 'tiles');
        if (this.color == Color.Neutral) {
            this.sprite.frame = 6;
        }
        else {
            this.sprite.frame = 2 * (this.color - 1);
        }
    }
    Meeple.prototype.move = function (player, direction) {
        if (player.color != this.color)
            return;
        if (this.state == player.state)
            return;
        this.state = player.state;
        var topMeeple = this.tile.meeples.pop();
        if (topMeeple != this) {
            this.tile.meeples.push(topMeeple);
            return;
        }
        var destinationTile = this.tile.neighbour(direction);
        var destinationMeeple = destinationTile.meeples.pop();
        if (destinationMeeple == null) {
            this.moveAfloat(destinationTile);
        }
        else if (destinationMeeple.color == this.color) {
            destinationMeeple.move(player, direction);
            this.moveAfloat(destinationTile);
        }
        else if (destinationMeeple.color == Color.Neutral) {
            destinationMeeple.assimilate(player);
            this.moveAfloat(destinationTile);
        }
        else {
        }
    };
    Meeple.prototype.moveAfloat = function (tileTo) {
        tileTo.meeples.push(this);
        this.tile = tileTo;
    };
    Meeple.prototype.assimilate = function (player) {
        this.color = player.color;
        this.state = player.state;
        player.meeples.push(this);
    };
    return Meeple;
}());
var Player = (function () {
    function Player(color, baseMeeple) {
        this.color = color;
        this.state = true;
        this.meeples = new Array();
        this.meeples.push(baseMeeple);
    }
    Player.prototype.move = function (direction) {
        var _this = this;
        this.state = !this.state;
        this.meeples.forEach(function (meeple) {
            meeple.move(_this, direction);
        });
    };
    return Player;
}());
var Tile = (function () {
    function Tile(position, anaander) {
        this.position = position;
        this.meeples = new Array();
        this.neighbours = new Array();
        this.sprite = anaander.game.add.sprite(this.position.x * anaander.tileSize.x, this.position.y * anaander.tileSize.y, 'tiles');
    }
    Tile.prototype.neighbour = function (direction) {
        return this.neighbours[direction];
    };
    return Tile;
}());
//# sourceMappingURL=app.js.map