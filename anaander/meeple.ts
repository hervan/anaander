class Meeple {

    color: Color;
    state: boolean;
    tile: Tile;
    
    sprite: Phaser.Sprite;

    constructor(color: Color, tile: Tile, anaander: Anaander) {

        this.color = color;
        this.tile = tile;
        this.state = true;
        
        this.sprite = anaander.game.add.sprite(this.tile.sprite.position.x + 10, this.tile.sprite.position.y + 10, 'tiles');
        this.sprite.scale.set(0.5, 0.5);
        this.update();
    }

    move(player: Player, direction: Direction) {

        if (player.color != this.color)
            return;

        if (this.state == player.state)
            return;

        this.state = player.state;

        var topMeeple = this.tile.meeples.pop();
        if (topMeeple != this) {

            if (topMeeple != null)
                this.tile.meeples.push(topMeeple);

            return;
        }

        this.tile.meeples.forEach((meeple) => {
            meeple.state = player.state;
        });

        var destinationTile = this.tile.neighbour(direction);
        if (destinationTile == null) {

            this.tile.meeples.push(this);
            return;
        }

        var destinationMeeple = destinationTile.meeples.pop();

        if (destinationMeeple == null) {

            this.moveAfloat(destinationTile);
            this.update();
        }
        else if (destinationMeeple.color == this.color) {

            destinationTile.meeples.push(destinationMeeple);
            destinationMeeple.move(player, direction);
            this.moveAfloat(destinationTile);

            destinationMeeple.update();
            this.update();
        }
        else if (destinationMeeple.color == Color.Neutral) {

            destinationTile.meeples.push(destinationMeeple);
            destinationMeeple.assimilateBy(player);
            this.moveAfloat(destinationTile);

            destinationMeeple.update();
            this.update();
        }
        else {
            // TODO: fight!
            this.tile.meeples.push(this);
            destinationTile.meeples.push(destinationMeeple);

            this.update();
            destinationMeeple.update();
        }
    }

    moveAfloat(destinationTile: Tile) {

        destinationTile.meeples.push(this);
        this.tile = destinationTile;
    }

    assimilateBy(player: Player) {

        this.color = player.color;
        this.state = player.state;

        player.meeples.push(this);
    }

    update() {

        this.sprite.position.set(this.tile.sprite.position.x + 10, this.tile.sprite.position.y + 10);

        if (this.color == Color.Neutral) {
            this.sprite.frame = 6;
        }
        else {
            this.sprite.frame = 2 * (this.color - 1);
        }
    }
}