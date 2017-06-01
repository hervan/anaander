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
        {
            key: 0,
            name: "iferrosilicon mine",
            pattern: Piece.i,
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
            name: "isonar probe",
            pattern: Piece.i,
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
            name: "imechanised agriculture",
            pattern: Piece.i,
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
            name: "ioil refinery",
            pattern: Piece.i,
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
    ],
    [
        {
            key: 4,
            name: "lferrosilicon mine",
            pattern: Piece.l,
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
            key: 5,
            name: "lsonar probe",
            pattern: Piece.l,
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
            key: 6,
            name: "lmechanised agriculture",
            pattern: Piece.l,
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
            key: 7,
            name: "loil refinery",
            pattern: Piece.l,
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
    ],
    [
        {
            key: 8,
            name: "oferrosilicon mine",
            pattern: Piece.o,
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
            key: 9,
            name: "osonar probe",
            pattern: Piece.o,
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
            key: 10,
            name: "omechanised agriculture",
            pattern: Piece.o,
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
            key: 11,
            name: "ooil refinery",
            pattern: Piece.o,
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
    ],
    [
        {
            key: 12,
            name: "sferrosilicon mine",
            pattern: Piece.s,
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
            key: 13,
            name: "ssonar probe",
            pattern: Piece.s,
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
            key: 14,
            name: "smechanised agriculture",
            pattern: Piece.s,
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
            key: 15,
            name: "soil refinery",
            pattern: Piece.s,
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
    ],
    [
        {
            key: 16,
            name: "tferrosilicon mine",
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
            key: 17,
            name: "tsonar probe",
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
            key: 18,
            name: "tmechanised agriculture",
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
            key: 19,
            name: "toil refinery",
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
