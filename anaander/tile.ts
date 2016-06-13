class Tile {

    position: Vector;

    meeples: Meeple[];

    city: City;

    neighbours: Tile[];

    constructor(position: Vector) {

        this.position = position;
    }

    neighbour(direction: Direction): Tile {

        return this;
    }
}