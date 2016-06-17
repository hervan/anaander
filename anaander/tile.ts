class Tile {

    position: Vector;

    meeples: Meeple[];

    city: City;

    neighbours: Tile[];
    
    sprite: Phaser.Sprite;

    constructor(position: Vector, anaander: Anaander) {

        this.position = position;
        this.meeples = new Array();
        this.neighbours = new Array();
        
        this.sprite = anaander.game.add.sprite(this.position.x * anaander.tileSize.x, this.position.y * anaander.tileSize.y, 'tiles');
    }

    neighbour(direction: Direction): Tile {

        return this.neighbours[direction];
    }
    
    push(arrivingMeeple: Meeple) {
        
        this.meeples.push(arrivingMeeple);
        this.repositionMeeples();
    }
    
    pop(): Meeple {
        
        var departingMeeple: Meeple = this.meeples.pop();
        this.repositionMeeples();
        
        return departingMeeple;
    }
    
    repositionMeeples() {
        
        var distance = 20 / (this.meeples.length + 1);
        var position = new Vector(this.sprite.x, this.sprite.y);
        
        this.meeples.forEach((meeple) => {

            if (meeple.tween != null && meeple.tween.isRunning) {

                meeple.tween.onComplete.addOnce(() => {
                    
                    position.x += distance;
                    position.y += distance;
                    
                    meeple.tween = meeple.sprite.game.add.tween(meeple.sprite)
                        .to({ x: position.x, y: position.y }, 50, Phaser.Easing.Default, true, Math.random() * 50);
                });
            }
            else {

                position.x += distance;
                position.y += distance;
                
                meeple.tween = meeple.sprite.game.add.tween(meeple.sprite)
                    .to({ x: position.x, y: position.y }, 50, Phaser.Easing.Default, true, Math.random() * 50);
            }
        });
    }
}