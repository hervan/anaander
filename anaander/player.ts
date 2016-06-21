class Player {

    color: Color;
    state: boolean;

    meeples: Meeple[];

    baseGame: Anaander;

    constructor(color: Color, baseMeeple: Meeple, anaander: Anaander) {

        this.color = color;
        this.state = false;

        this.meeples = new Array();
        this.meeples.push(baseMeeple);

        this.baseGame = anaander;
    }

    move(direction: Direction) {

        this.state = !this.state;
        this.meeples.forEach((meeple: Meeple) => {
            meeple.move(this, direction);
        });
    }

    remove(meeple: Meeple) {

        this.meeples.splice(this.meeples.indexOf(meeple), 1);

        if (this.meeples.length == 0) {

            this.removePlayer();
        }
    }

    removePlayer() {

        this.baseGame.players.splice(this.baseGame.players.indexOf(this), 1);

        if (this.baseGame.players.length == 1) {

            this.baseGame.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.removeAll();
            this.baseGame.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.removeAll();
            this.baseGame.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.removeAll();
            this.baseGame.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.removeAll();

            this.baseGame.players[0].meeples.forEach((meeple) => {

                meeple.tween = this.baseGame.game.add.tween(meeple.sprite.scale)
                    .from({ x: 0.6, y: 0.6 }, 100, Phaser.Easing.Default, true, 200).loop(true);
            });
        }
    }
}