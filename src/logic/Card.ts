import {EmptySite, Piece} from "./Construction";
import {Game} from "./Game";
import {Meeple} from "./Meeple";
import {Player} from "./Player";
import {Position, positionToIndex, Resource, Terrain} from "./Terrain";

interface Card {
    readonly key: number;
    readonly name: string;
    readonly pattern: Piece;
    readonly cost: number[];
    readonly target: (game: Game, position: Position) => number[];
    readonly effect: <T>(param: T) => T;
    readonly acquisitionRound: number;
};

export const decks: Card[][] = [
    [
    ],
    [
    ],
    [
    ],
    [
    ],
    [
        {
            key: 0,
            name: "ferrosilicon mine",
            pattern: Piece.t,
            cost: [0, 1, 1, 0],
            target: (game: Game, position: Position) => [positionToIndex(position, game.boardSize)],
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.silicon ? amount * 2 : amount
                    )
                }
            }),
            acquisitionRound: 0
        },
        {
            key: 1,
            name: "sonar probe",
            pattern: Piece.t,
            cost: [1, 0, 0, 1],
            target: (game: Game, position: Position) => [positionToIndex(position, game.boardSize)],
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.ore ? amount * 2 : amount
                    )
                }
            }),
            acquisitionRound: 0
        },
        {
            key: 2,
            name: "mechanised agriculture",
            pattern: Piece.t,
            cost: [0, 0, 1, 1],
            target: (game: Game, position: Position) => [positionToIndex(position, game.boardSize)],
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.food ? amount * 2 : amount
                    )
                }
            }),
            acquisitionRound: 0
        },
        {
            key: 3,
            name: "oil refinery",
            pattern: Piece.t,
            cost: [1, 0, 1, 0],
            target: (game: Game, position: Position) => [positionToIndex(position, game.boardSize)],
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.fuel ? amount * 2 : amount
                    )
                }
            }),
            acquisitionRound: 0
        }
    ]
];

export default Card;
