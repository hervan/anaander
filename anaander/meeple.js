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
//# sourceMappingURL=meeple.js.map