import {EmptySite, Piece} from "./Construction";
import {Game, terrainPatch as tp} from "./Game";
import {Meeple} from "./Meeple";
import {Player, Team} from "./Player";
import {Geography, Position, positionToIndex, Resource, Terrain} from "./Terrain";

interface Card {
    readonly key: number;
    readonly name: string;
    readonly pattern: Piece;
    readonly cost: number[];
    readonly acquisitionRound: number;
    readonly target: (game: Game, position: Position) => number[];
    readonly effect: <T>(param: T) => T;
    readonly apply:
        <T>(game: Game,
        effect: (param: T) => T,
        targets: T[]) => Game;
};

const currentTerrain =
    (game: Game, position: Position) =>
    [game.terrains[positionToIndex(position, game.boardSize)].key];

const terrainPatch: (game: Game, position: Position) => number[] = (game, position) =>
    tp(game, position).map((p) => game.terrains[positionToIndex(p, game.boardSize)].key);

const gameTerrains =
    (game: Game, effect: (terrain: Terrain) => Terrain, targets: number[]) =>
    ({
        ...game,
        terrains: game.terrains.map(
            (terrain) =>
            targets.some((key) => key === terrain.key) ?
            effect(terrain) :
            terrain
        )
    });

export const initialHand = (team: Team) => [
    {
        key: team,
        name: "found city",
        pattern: Piece.i,
        cost: [1, 0, 0, 0, 0],
        target: terrainPatch,
        effect: (terrain: Terrain): Terrain => ({
            ...terrain,
            geography: Geography.sprawl,
            spaceLeft: terrain.spaceLeft + (Geography.sprawl - terrain.geography)
        }),
        apply: gameTerrains,
        acquisitionRound: 1
    }
];

export const decks: Card[][] = [
    [
        {
            key: 5,
            name: "iferrosilicon mine",
            pattern: Piece.i,
            cost: [0, 1, 1, 0, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.silicon ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 6,
            name: "isonar probe",
            pattern: Piece.i,
            cost: [1, 0, 0, 1, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.ore ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 7,
            name: "imechanised agriculture",
            pattern: Piece.i,
            cost: [0, 0, 1, 1, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.food ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 8,
            name: "ioil refinery",
            pattern: Piece.i,
            cost: [1, 0, 1, 0, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.fuel ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        }
    ],
    [
        {
            key: 9,
            name: "lferrosilicon mine",
            pattern: Piece.l,
            cost: [0, 1, 1, 0, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.silicon ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 10,
            name: "lsonar probe",
            pattern: Piece.l,
            cost: [1, 0, 0, 1, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.ore ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 11,
            name: "lmechanised agriculture",
            pattern: Piece.l,
            cost: [0, 0, 1, 1, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.food ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 12,
            name: "loil refinery",
            pattern: Piece.l,
            cost: [1, 0, 1, 0, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.fuel ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        }
    ],
    [
        {
            key: 13,
            name: "oferrosilicon mine",
            pattern: Piece.o,
            cost: [0, 1, 1, 0, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.silicon ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 14,
            name: "osonar probe",
            pattern: Piece.o,
            cost: [1, 0, 0, 1, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.ore ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 15,
            name: "omechanised agriculture",
            pattern: Piece.o,
            cost: [0, 0, 1, 1, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.food ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 16,
            name: "ooil refinery",
            pattern: Piece.o,
            cost: [1, 0, 1, 0, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.fuel ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        }
    ],
    [
        {
            key: 17,
            name: "sferrosilicon mine",
            pattern: Piece.s,
            cost: [0, 1, 1, 0, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.silicon ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 18,
            name: "ssonar probe",
            pattern: Piece.s,
            cost: [1, 0, 0, 1, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.ore ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 19,
            name: "smechanised agriculture",
            pattern: Piece.s,
            cost: [0, 0, 1, 1, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.food ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 20,
            name: "soil refinery",
            pattern: Piece.s,
            cost: [1, 0, 1, 0, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.fuel ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        }
    ],
    [
        {
            key: 21,
            name: "tferrosilicon mine",
            pattern: Piece.t,
            cost: [0, 1, 1, 0, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.silicon ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 22,
            name: "tsonar probe",
            pattern: Piece.t,
            cost: [1, 0, 0, 1, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.ore ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 23,
            name: "tmechanised agriculture",
            pattern: Piece.t,
            cost: [0, 0, 1, 1, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.food ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        },
        {
            key: 24,
            name: "toil refinery",
            pattern: Piece.t,
            cost: [1, 0, 1, 0, 0],
            target: currentTerrain,
            effect: (terrain: Terrain): Terrain => ({
                ...terrain,
                construction: {
                    ...terrain.construction,
                    production: terrain.construction.production.map((amount, i) =>
                        i === Resource.fuel ? amount * 2 : amount
                    )
                }
            }),
            apply: gameTerrains,
            acquisitionRound: 0
        }
    ]
];

export default Card;
