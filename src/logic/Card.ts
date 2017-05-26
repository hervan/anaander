import {EmptySite, Piece} from "./Construction";
import {Meeple} from "./Meeple";
import {Player} from "./Player";
import {Position, positionToIndex, Resource, Terrain} from "./Terrain";

export type Card<T> = {
    readonly name: string;
    readonly pattern: Piece;
    readonly cost: number[];
    readonly target: (position: Position, game: {}) => T[];
    readonly effect: (param: T) => T;
};

export type CardTarget =
| Terrain
| Player
| Meeple;

const targetTerrain = (position: Position, game: {terrains: Terrain[], boardSize: number}) =>
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
    }
];
