class Meeple {

    color: Color;
    state: boolean;
    tile: Tile;
    
    sprite: Phaser.Sprite;
    tween: Phaser.Tween;

    constructor(color: Color, tile: Tile, anaander: Anaander) {

        this.color = color;
        this.tile = tile;
        this.state = true;
        
        this.sprite = anaander.game.add.sprite(this.tile.sprite.x + 10, this.tile.sprite.y + 10, 'tiles');
        this.sprite.scale.set(0.5, 0.5);
        this.update();
    }

    move(player: Player, direction: Direction) {

        if (player.color != this.color)
            return;

        if (this.state == player.state)
            return;

        this.state = player.state;

        var topMeeple = this.tile.pop();
        if (topMeeple != this) {

            if (topMeeple != null)
                this.tile.push(topMeeple);

            return;
        }

        this.tile.meeples.forEach((meeple) => {
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
            // TODO: fight!
            destinationMeeple.moveAfloat(destinationTile);
            this.moveAfloat(destinationTile);

            destinationMeeple.update();
            this.update();
        }
    }

    moveAfloat(destinationTile: Tile) {

        this.tile = destinationTile;
        destinationTile.push(this);
    }

    assimilateBy(player: Player) {

        this.color = player.color;
        this.state = player.state;

        player.meeples.push(this);
    }

    update() {

        if (this.color == Color.Neutral) {
            this.sprite.frame = 6;
        }
        else {
            this.sprite.frame = 2 * (this.color - 1);
        }
    }
}