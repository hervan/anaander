class Player {

    color: Color;
    state: boolean;

    meeples: Meeple[];

    constructor(color: Color, baseMeeple: Meeple) {

        this.color = color;
        this.state = true;

        this.meeples = new Array();
        this.meeples.push(baseMeeple);
    }

    move(direction: Direction) {

        this.state = !this.state;
        this.meeples.forEach((meeple: Meeple) => {
            meeple.move(this, direction);
        });
    }
}