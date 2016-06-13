class Meeple {

    color: Color;
    state: boolean;
    tile: Tile;

    constructor(color: Color, tile: Tile) {

        this.color = color;
        this.tile = tile;
        this.state = true;
    }

    move(player: Player, direction: Direction) {

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
            // TODO: fight!
        }
    }

    moveAfloat(tileTo: Tile) {

        tileTo.meeples.push(this);
        this.tile = tileTo;
    }

    assimilate(player: Player) {

        this.color = player.color;
        this.state = player.state;

        player.meeples.push(this);
    }
}