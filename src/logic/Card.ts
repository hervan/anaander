import {EmptySite, Piece} from "./Construction";
import {Game} from "./Game";
import {Meeple} from "./Meeple";
import {Player} from "./Player";
import {Position, positionToIndex, Resource, Terrain} from "./Terrain";

interface Card {
    readonly name: string;
    readonly cost: number[];
    readonly effect: (game: Game, position: Position) => Game;
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
            name: "ferrosilicon mine",
            cost: [0, 1, 1, 0],
            effect: (game: Game, position: Position) => ({
                ...game,
                terrains: game.terrains.map((terrain) =>
                    positionToIndex(terrain.position, game.boardSize) === positionToIndex(position, game.boardSize)
                        && terrain.construction.type === "emptysite" ?
                    {
                        ...terrain,
                        construction: {
                            ...terrain.construction,
                            production: terrain.construction.production.map((amount, i) =>
                                i === Resource.silicon ? amount * 2 : amount
                            )
                        }
                    } :
                    terrain
                )
            })
        },
        {
            name: "sonar probe",
            cost: [1, 0, 0, 1],
            effect: (game: Game, position: Position) => ({
                ...game,
                terrains: game.terrains.map((terrain) =>
                    positionToIndex(terrain.position, game.boardSize) === positionToIndex(position, game.boardSize)
                        && terrain.construction.type === "emptysite" ?
                    {
                        ...terrain,
                        construction: {
                            ...terrain.construction,
                            production: terrain.construction.production.map((amount, i) =>
                                i === Resource.ore ? amount * 2 : amount
                            )
                        }
                    } :
                    terrain
                )
            })
        },
        {
            name: "mechanised agriculture",
            cost: [0, 0, 1, 1],
            effect: (game: Game, position: Position) => ({
                ...game,
                terrains: game.terrains.map((terrain) =>
                    positionToIndex(terrain.position, game.boardSize) === positionToIndex(position, game.boardSize)
                        && terrain.construction.type === "emptysite" ?
                    {
                        ...terrain,
                        construction: {
                            ...terrain.construction,
                            production: terrain.construction.production.map((amount, i) =>
                                i === Resource.food ? amount * 2 : amount
                            )
                        }
                    } :
                    terrain
                )
            })
        },
        {
            name: "oil refinery",
            cost: [1, 0, 1, 0],
            effect: (game: Game, position: Position) => ({
                ...game,
                terrains: game.terrains.map((terrain) =>
                    positionToIndex(terrain.position, game.boardSize) === positionToIndex(position, game.boardSize)
                        && terrain.construction.type === "emptysite" ?
                    {
                        ...terrain,
                        construction: {
                            ...terrain.construction,
                            production: terrain.construction.production.map((amount, i) =>
                                i === Resource.fuel ? amount * 2 : amount
                            )
                        }
                    } :
                    terrain
                )
            })
        }
    ]
];

export default Card;
