import {EmptySite, Piece} from "./Construction";
import {Game, terrainPatch} from "./Game";
import {Meeple} from "./Meeple";
import {Player, Team} from "./Player";
import {Geography, Position, positionToIndex, Resource, Terrain} from "./Terrain";

interface Card<T> {
    readonly key: number;
    readonly name: string;
    readonly pattern: Piece;
    readonly cost: number[];
    readonly acquisitionRound: number;
    readonly target: (game: Game, position: Position) => number[];
    readonly effect: (param: T) => T;
    readonly apply: (
        game: Game,
        effect: (param: T) => T,
        targets: number[]
    ) => Game;
};

const currentTerrain =
    (game: Game, position: Position) =>
    [game.terrains[positionToIndex(position, game.boardSize)].key];

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

export const initialHand = (team: Team) => [{
    key: team,
    acquisitionRound: 0
}];

const basicCards = (team: Team) => [
    {
        key: team,
        name: "found city",
        pattern: Piece.i,
        cost: [1, 0, 0, 0, 0],
        target: (game: Game, position: Position) => {
            const construction = game.terrains[positionToIndex(position, game.boardSize)].construction;
            return construction.type === "city" && construction.team === game.turn.team ?
                terrainPatch(game, position)
                    .map((p) => game.terrains[positionToIndex(p, game.boardSize)].key) :
                [];
        },
        effect: (terrain: Terrain): Terrain => ({
            ...terrain,
            geography: Geography.sprawl,
            spaceLeft: terrain.spaceLeft + (Geography.sprawl - terrain.geography),
            construction: {
                ...terrain.construction,
                production:
                    terrain.construction.type === "emptysite" ?
                    [...Array(5).keys()].map((o) => 0) :
                    terrain.construction.production
            }
        }),
        apply: gameTerrains,
        acquisitionRound: 0
    }
];

export const cards = [
    ...[...Array(5).keys()]
        .map((cardKey) => basicCards(cardKey))
        .reduce((acc, bc) => [...acc, ...bc], []),
    {
        key: 5,
        name: "ferrosilicon mine I",
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
        name: "sonar probe I",
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
        name: "mechanised agriculture I",
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
        name: "oil refinery I",
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
    },
    {
        key: 9,
        name: "ferrosilicon mine L",
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
        name: "sonar probe L",
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
        name: "mechanised agriculture L",
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
        name: "oil refinery L",
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
    },
    {
        key: 13,
        name: "ferrosilicon mine O",
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
        name: "sonar probe O",
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
        name: "mechanised agriculture O",
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
        name: "oil refinery O",
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
    },
    {
        key: 17,
        name: "ferrosilicon mine S",
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
        name: "sonar probe S",
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
        name: "mechanised agriculture S",
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
        name: "oil refinery S",
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
    },
    {
        key: 21,
        name: "ferrosilicon mine T",
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
        name: "sonar probe T",
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
        name: "mechanised agriculture T",
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
        name: "oil refinery T",
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
];

export const decks: number[][] = [
    cards.filter((card) => card.key >= 5 * basicCards(0).length && card.pattern === Piece.i).map((card) => card.key),
    cards.filter((card) => card.key >= 5 * basicCards(0).length && card.pattern === Piece.l).map((card) => card.key),
    cards.filter((card) => card.key >= 5 * basicCards(0).length && card.pattern === Piece.o).map((card) => card.key),
    cards.filter((card) => card.key >= 5 * basicCards(0).length && card.pattern === Piece.s).map((card) => card.key),
    cards.filter((card) => card.key >= 5 * basicCards(0).length && card.pattern === Piece.t).map((card) => card.key)
];

export default Card;
