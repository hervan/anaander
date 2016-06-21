class Meeple {

    color: Color;
    state: boolean;
    tile: Tile;
    
    sprite: Phaser.Sprite;
    tween: Phaser.Tween;

    baseGame: Anaander;

    strength: number;
    power: number;

    constructor(color: Color, tile: Tile, anaander: Anaander) {

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

    move(player: Player, direction: Direction) {

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
            
            destinationMeeple.moveAfloat(destinationTile);
            this.moveAfloat(destinationTile);
            destinationMeeple.strength -= this.power / 2;

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
    }
}