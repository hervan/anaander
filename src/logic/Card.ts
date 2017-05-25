import { Position, positionToIndex } from "./Common";
import { Piece } from "./Construction";
import { Terrain } from "./Terrain";

type Card<T> = {
    readonly name: string;
    readonly pattern: Piece;
    readonly cost: number[];
    readonly target: (game: Game, position: Position) => T[];
    readonly effect: (param: T) => T;
};

type CardTarget =
| Terrain
| Player
| Meeple;

const targetTerrain = (game: Game, position: Position) =>
    [game.terrains[positionToIndex(position, game.boardSize)]];

const cards: Array<Card<CardTarget>> = [
    {
        name: "oil refinery",
        pattern: Piece.i, // which's the one producing energy?
        cost: [0, 0, 0, 0], // no cost
        target: targetTerrain,
        effect: (param: Terrain) => ({
            ...param,
            construction: {
                ...param.construction,
                production: (param.construction as EmptySite).production.map((amount, i) =>
                    i === Resource.fuel ? amount + 1 : amount
                )
            }
        })
        // how to define (in code) what can be chosen as target?
    }
];
