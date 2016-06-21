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
        var _this = this;
        this.playerCount = 2;
        this.players = new Array();
        this.currentPlayer = Color.Red;
        this.tileSize = new Vector(40, 40);
        this.boardSize = new Vector(Math.trunc(1200 / this.tileSize.x), Math.trunc(800 / this.tileSize.y));
        this.board = new Board(this);
        for (var i = 1; i <= this.playerCount; i++) {
            var baseTile;
            do {
                baseTile = this.board.tile(new Vector(Math.trunc(Math.random() * this.boardSize.x), Math.trunc(Math.random() * this.boardSize.y)));
            } while (baseTile.meeples.length > 0);
            var baseMeeple = new Meeple(i, baseTile, this);
            baseTile.push(baseMeeple);
            this.players.push(new Player(i, baseMeeple, this));
        }
        this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
            .onDown.add(function () {
            if (_this.game.tweens.getAll().length == 0) {
                _this.players[_this.currentPlayer - 1].move(Direction.Up);
                _this.currentPlayer = (_this.currentPlayer % _this.playerCount) + 1;
                _this.players[_this.currentPlayer - 1].meeples.forEach(function (meeple) {
                    meeple.tween = _this.game.add.tween(meeple.sprite.scale)
                        .from({ x: 0.6, y: 0.6 }, 100, Phaser.Easing.Default, true, 200);
                });
            }
        });
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
            .onDown.add(function () {
            if (_this.game.tweens.getAll().length == 0) {
                _this.players[_this.currentPlayer - 1].move(Direction.Left);
                _this.currentPlayer = (_this.currentPlayer % _this.playerCount) + 1;
                _this.players[_this.currentPlayer - 1].meeples.forEach(function (meeple) {
                    meeple.tween = _this.game.add.tween(meeple.sprite.scale)
                        .from({ x: 0.6, y: 0.6 }, 100, Phaser.Easing.Default, true, 200);
                });
            }
        });
        this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
            .onDown.add(function () {
            if (_this.game.tweens.getAll().length == 0) {
                _this.players[_this.currentPlayer - 1].move(Direction.Down);
                _this.currentPlayer = (_this.currentPlayer % _this.playerCount) + 1;
                _this.players[_this.currentPlayer - 1].meeples.forEach(function (meeple) {
                    meeple.tween = _this.game.add.tween(meeple.sprite.scale)
                        .from({ x: 0.6, y: 0.6 }, 100, Phaser.Easing.Default, true, 200);
                });
            }
        });
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
            .onDown.add(function () {
            if (_this.game.tweens.getAll().length == 0) {
                _this.players[_this.currentPlayer - 1].move(Direction.Right);
                _this.currentPlayer = (_this.currentPlayer % _this.playerCount) + 1;
                _this.players[_this.currentPlayer - 1].meeples.forEach(function (meeple) {
                    meeple.tween = _this.game.add.tween(meeple.sprite.scale)
                        .from({ x: 0.6, y: 0.6 }, 100, Phaser.Easing.Default, true, 200);
                });
            }
        });
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
        this.state = false;
        if (this.color == Color.Neutral) {
            this.strength = 128 + (Math.random() * 128);
            this.power = 50 + (Math.random() * 50);
        }
        else {
            this.strength = 256 + (Math.random() * 256);
            this.power = 100 + (Math.random() * 100);
        }
        this.baseGame = anaander;
        this.sprite = this.baseGame.game.add.sprite(this.tile.sprite.x + 10, this.tile.sprite.y + 10, 'tiles');
        this.sprite.scale.set(0.5, 0.5);
        this.update();
    }
    Meeple.prototype.move = function (player, direction) {
        if (player.color != this.color)
            return;
        if (this.state == player.state)
            return;
        this.state = player.state;
        var topMeeple = this.tile.pop();
        if (topMeeple != this) {
            if (topMeeple != null) {
                var underneathMeeple = this.tile.pop();
                if (underneathMeeple == this) {
                    topMeeple.strength -= this.power;
                }
                if (underneathMeeple != null) {
                    this.tile.push(underneathMeeple);
                }
                this.tile.push(topMeeple);
                topMeeple.update();
            }
            return;
        }
        this.tile.meeples.forEach(function (meeple) {
            meeple.state = player.state;
        });
        var destinationTile = this.tile.neighbour(direction);
        if (destinationTile == null) {
            this.tile.push(this);
            return;
        }
        var destinationMeeple = destinationTile.pop();
        if (destinationMeeple == null) {
            this.moveAfloat(destinationTile);
            this.update();
        }
        else if (destinationMeeple.color == this.color) {
            destinationMeeple.moveAfloat(destinationTile);
            destinationMeeple.move(player, direction);
            this.moveAfloat(destinationTile);
            destinationMeeple.update();
            this.update();
        }
        else if (destinationMeeple.color == Color.Neutral) {
            destinationMeeple.moveAfloat(destinationTile);
            destinationMeeple.assimilateBy(player);
            this.moveAfloat(destinationTile);
            destinationMeeple.update();
            this.update();
        }
        else {
            destinationMeeple.moveAfloat(destinationTile);
            this.moveAfloat(destinationTile);
            destinationMeeple.strength -= this.power / 2;
            destinationMeeple.update();
            this.update();
        }
    };
    Meeple.prototype.moveAfloat = function (destinationTile) {
        this.tile = destinationTile;
        destinationTile.push(this);
    };
    Meeple.prototype.assimilateBy = function (player) {
        this.color = player.color;
        this.state = player.state;
        player.meeples.push(this);
    };
    Meeple.prototype.update = function () {
        if (this.strength <= 0) {
            var player = this.baseGame.players[this.color - 1];
            player.remove(this);
            this.tile.remove(this);
            this.sprite.destroy();
            this.tween = null;
        }
        if (this.color == Color.Neutral) {
            this.sprite.frame = 6;
        }
        else {
            this.sprite.frame = 2 * (this.color - 1);
        }
        this.sprite.alpha = Math.min(256, this.strength) / 256;
    };
    return Meeple;
}());
var Player = (function () {
    function Player(color, baseMeeple, anaander) {
        this.color = color;
        this.state = false;
        this.meeples = new Array();
        this.meeples.push(baseMeeple);
        this.baseGame = anaander;
    }
    Player.prototype.move = function (direction) {
        var _this = this;
        this.state = !this.state;
        this.meeples.forEach(function (meeple) {
            meeple.move(_this, direction);
        });
    };
    Player.prototype.remove = function (meeple) {
        this.meeples.splice(this.meeples.indexOf(meeple), 1);
        if (this.meeples.length == 0) {
            this.removePlayer();
        }
    };
    Player.prototype.removePlayer = function () {
        var _this = this;
        this.baseGame.players.splice(this.baseGame.players.indexOf(this), 1);
        if (this.baseGame.players.length == 1) {
            this.baseGame.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.removeAll();
            this.baseGame.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.removeAll();
            this.baseGame.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.removeAll();
            this.baseGame.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.removeAll();
            this.baseGame.players[0].meeples.forEach(function (meeple) {
                meeple.tween = _this.baseGame.game.add.tween(meeple.sprite.scale)
                    .from({ x: 0.6, y: 0.6 }, 100, Phaser.Easing.Default, true, 200).loop(true);
            });
        }
    };
    return Player;
}());
var Tile = (function () {
    function Tile(position, anaander) {
        this.position = position;
        this.meeples = new Array();
        this.neighbours = new Array();
        this.baseGame = anaander;
        this.sprite = this.baseGame.game.add.sprite(this.position.x * anaander.tileSize.x, this.position.y * anaander.tileSize.y, 'tiles');
    }
    Tile.prototype.neighbour = function (direction) {
        return this.neighbours[direction];
    };
    Tile.prototype.push = function (arrivingMeeple) {
        this.meeples.push(arrivingMeeple);
        this.repositionMeeples();
    };
    Tile.prototype.pop = function () {
        var departingMeeple = this.meeples.pop();
        this.repositionMeeples();
        return departingMeeple;
    };
    Tile.prototype.remove = function (meeple) {
        this.meeples.splice(this.meeples.indexOf(meeple), 1);
    };
    Tile.prototype.repositionMeeples = function () {
        var _this = this;
        var distance = 20 / (this.meeples.length + 1);
        var position = new Vector(this.sprite.x, this.sprite.y);
        this.meeples.forEach(function (meeple) {
            if (meeple.tween != null && meeple.tween.isRunning) {
                meeple.tween.onComplete.addOnce(function () {
                    position.x += distance;
                    position.y += distance;
                    meeple.tween = _this.baseGame.game.add.tween(meeple.sprite)
                        .to({ x: position.x, y: position.y }, 50, Phaser.Easing.Default, true, Math.random() * 50);
                });
            }
            else {
                position.x += distance;
                position.y += distance;
                meeple.tween = _this.baseGame.game.add.tween(meeple.sprite)
                    .to({ x: position.x, y: position.y }, 50, Phaser.Easing.Default, true, Math.random() * 50);
            }
        });
    };
    return Tile;
}());
//# sourceMappingURL=app.js.map