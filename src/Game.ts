export enum Team {
    info,
    warning,
    success,
    danger,
    primary,
    default
};

export enum Action {
    up,
    left,
    down,
    right,
    explore,
    hold
};

export enum Geography {
    sea,
    desert,
    swamp,
    mountain,
    forest,
    plains,
    valley
};

export enum Resource {
    fuel,
    food,
    ore,
    silicon
}

export const GeographyInfo = [
    { type: "sea", piece: null, resources: [] },
    { type: "desert", piece: null, resources: [Resource.fuel, Resource.silicon] },
    { type: "swamp", piece: "i", resources: [Resource.fuel, Resource.ore] },
    { type: "mountain", piece: "l", resources: [Resource.ore, Resource.silicon] },
    { type: "forest", piece: "o", resources: [Resource.food, Resource.ore] },
    { type: "plains", piece: "s", resources: [Resource.fuel, Resource.food] },
    { type: "valley", piece: "t", resources: [Resource.food, Resource.silicon] }
];

enum Piece {
    i,
    l,
    o,
    s,
    t
}

const pieceShapes: Array<{ i: number, piece: string, shape: Position[] }> = [
    { i: 0, piece: "i", shape: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}, {row: 3, col: 0}] },
    { i: 1, piece: "l", shape: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}, {row: 2, col: 1}] },
    { i: 2, piece: "o", shape: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 1, col: 1}, {row: 0, col: 1}] },
    { i: 3, piece: "s", shape: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 1, col: 1}, {row: 2, col: 1}] },
    { i: 4, piece: "t", shape: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}, {row: 1, col: 1}] }
];

export enum Side {
    heads,
    tails,
    none
};

export type Position = {
    readonly row: number;
    readonly col: number;
};

export type Meeple = {
    readonly key: number;
    readonly position: Position;
    readonly team: Team;
    readonly side: Side;
    readonly strength: number;
    readonly resistance: number;
    readonly faith: number;
    readonly speed: number;
    readonly topsMeeple: number;
};

export type City = {
    readonly type: "city";
    readonly key: number;
    readonly name: string;
    readonly defense: number;
    readonly team: Team;
};

type Building = {
    readonly type: "building";
    readonly name: string;
    readonly blueprint: string;
    readonly team: Team;
    readonly side: Side;
};

const Buildings: { [key: string]: string } = {
    i: "research facility",
    l: "power plant",
    o: "school",
    s: "station",
    t: "hospital"
};

type BuildingPhase =
| "notbuilt"
| "blueprint"
| "built";

type EmptySite = {
    readonly type: "emptysite";
    readonly resources: number[];
};

export type Construction =
| Building
| City
| EmptySite;

export type Terrain = {
    readonly position: Position;
    readonly geography: Geography;
    readonly spaceLeft: number;
    readonly topMeeple: number;
    readonly construction: Construction;
};

export type Player = {
    readonly team: Team;
    readonly swarmSize: number;
    readonly cities: number[];
    readonly resources: number[];
    readonly buildingPhase: BuildingPhase[];
    readonly usedActions: number;
};

export type Play = {
    readonly team: Team;
    readonly action: Action;
    readonly selection: number[];
};

const InvalidPlays: { [key: string]: string } = {
    MeepleNotAvailable: "choose a meeple of your own team and with the current turn side up.",
    OutOfBoard: "keep your meeples inside the board.",
    NotYourTurn: "wait for your turn to begin.",
    TerrainIsCrowded: "move to a terrain with space available.",
    NotOnGround: "only meeples on the ground can explore the terrain.",
    NoSelection: "please select meeples before choosing the action.",
    NoActions: "you need to control more cities to perform more actions.",
    BuildingCooldown: "you just activated this building, please wait another turn."
};

type Turn = {
    readonly round: number;
    readonly team: Team;
    readonly side: Side;
};

export type Outcome = {
    type: "action"
    action: Action
} | {
    type: "invalid"
    explanation: string;
} | {
    type: "none"
} | {
    type: "gameover"
};

export type Game = {
    readonly boardSize: number;
    readonly players: Player[];
    readonly terrains: Terrain[];
    readonly meeples: Meeple[];
    readonly deck: Card[];
    readonly discardPile: Card[];
    readonly turn: Turn;
    readonly outcome: Outcome[];
};

type Card = {
    readonly name: string;
    readonly pattern: Piece;
    readonly input: (param?: Player | Position) => number;
    readonly cost: number[];
    readonly effect: (target: Array<Meeple | Player | Position | Terrain>)
        => Array<Meeple | Player | Position | Terrain>;
};

const cards: Card[] = [
    {
        name: "oil platform",
        pattern: Piece.i, // which's the one producing energy?
        input: () => 1, // always one, can't be multiplied
        cost: [0, 0, 0, 0], // no cost
        effect: (target: Terrain[]) => target
            .map((terrain) => terrain)
            // read production from GeographyInfo when instanced,
            // so it can be changed here
    } // how to deal with dynamic targets? should cost change dynamically?
];

export function logBoard(game: Game): void {

    const teamSymbol: { [key: string]: string } = {
        info: "1",
        warning: "2",
        success: "3",
        danger: "4",
        primary: "5",
        default: "o"
    };

    const board: string = game.terrains.reduce(((acc, terrain, index) =>
        acc + (terrain.topMeeple === -1 ? "#" : teamSymbol[game.meeples[terrain.topMeeple].team])
            + (index % game.boardSize === game.boardSize - 1 ? "\n" : "")), "");

    console.log(board);
}

function flipSide(side: Side): Side {

    return (side + 1) % 2;
}

function rotateTeam(turn: Turn, playerCount: number): Team {

    return playerCount < 1 ?
        turn.team :
        (turn.team + 1) % playerCount;
}

function nextTurn(game: Game): Game {

    let { round, team, side } = game.turn;

    let availableTeams = game.players
        .filter((player) => player.usedActions < player.cities.length + 1
            && availableMeeples(game, player.team).length > 0)
        .map((player) => player.team);

    if (availableTeams.length === 0) {
        // no more actions left this round
        round++;
        team = -1;
        side = flipSide(side);
    } else {

        do {
            team = rotateTeam({
                round: round,
                team: team,
                side: side
            }, game.players.length);

        } while (!availableTeams.some((t) => t === team));
    }

    return {
        ...game,
        turn: {
            round: round,
            team: team,
            side: side
        }
    };
}

function isOver(game: Game): boolean {

    if (game.players.filter((player) => player.swarmSize > 0).length < 2) {

        return true;
    }

    return false;
}

export function positionToIndex(position: Position, boardSize: number): number {

    return (position.row * boardSize + position.col);
}

function teamControls(game: Game, position: Position, team: Team = game.turn.team): boolean {

    const meepleKey = game.terrains[positionToIndex(position, game.boardSize)].topMeeple;

    return meepleKey !== -1
        && game.meeples[meepleKey].team === team
        && meeplesBelow(game, meepleKey).every((meeple) => meeple.team === team);
}

export function meeplesBelow(game: Game, meepleIndex: number, acc: Meeple[] = []): Meeple[] {

    const meeple: Meeple = game.meeples[meepleIndex];

    if (!meeple) {

        return acc;

    } else if (meeple.topsMeeple !== -1) {

        return meeplesBelow(game, meeple.topsMeeple, [...acc, meeple]);

    } else {

        return [...acc, meeple];
    }
}

export function availableMeeples(game: Game, team: Team = game.turn.team): Meeple[] {

    return game.terrains.filter((terrain) => isMeepleAvailable(game, terrain.position, team))
        .map((terrain) => game.meeples[terrain.topMeeple]);
}

export function isMeepleAvailable(game: Game, position: Position, team: Team = game.turn.team): boolean {

    const terrain = game.terrains[positionToIndex(position, game.boardSize)];
    const meepleIndex = terrain.topMeeple;
    const meeple = game.meeples[meepleIndex];

    return meepleIndex !== -1
        && meeple.team === team
        && meeple.side === game.turn.side;
}

export function selectSwarm(game: Game, position: Position, selection: number[] = []): number[] {

    const terrain = game.terrains[positionToIndex(position, game.boardSize)];
    const meeple = game.meeples[terrain.topMeeple];

    if (isMeepleAvailable(game, position)
        && !selection.some((mIndex) =>
            position.row === game.meeples[mIndex].position.row && position.col === game.meeples[mIndex].position.col)) {

        if (terrain.construction.type === "city"
            && terrain.construction.team !== meeple.team
            && terrain.spaceLeft > 0) {

            if (selection.length === 0) {

                selection.push(meeple.key);
            }
        } else if (terrain.construction.type === "building"
            && terrain.construction.team === meeple.team
            && terrain.spaceLeft > 0) {

            if (selection.length === 0) {

                selection.push(meeple.key);
            }
        } else {

            selection.push(meeple.key);
            selection = neighbours(position, game.boardSize)
                .reduce((acc, pos) => selectSwarm(game, pos, acc), selection);
        }
    }

    return selection.sort((a, b) =>
        positionToIndex(game.meeples[a].position, game.boardSize)
        - positionToIndex(game.meeples[b].position, game.boardSize));
}

export function neighbours(position: Position, boardSize: number): Position[] {

    return adjacent(position, boardSize)
        .concat(diagonal(position, boardSize));
}

function insideBoard(position: Position, boardSize: number) {

    return position.row >= 0
        && position.col >= 0
        && position.row < boardSize
        && position.col < boardSize;
}

function adjacent(position: Position, boardSize: number): Position[] {

    const ns: Position[] = [];

    if (!insideBoard(position, boardSize)) {

        return ns;
    }

    if (position.row > 0) {

        ns.push({ row: position.row - 1, col: position.col });
    }

    if (position.col > 0) {

        ns.push({ row: position.row, col: position.col - 1 });
    }

    if (position.row < boardSize - 1) {

        ns.push({ row: position.row + 1, col: position.col });
    }

    if (position.col < boardSize - 1) {

        ns.push({ row: position.row, col: position.col + 1 });
    }

    return ns;
}

function diagonal(position: Position, boardSize: number): Position[] {

    const ns: Position[] = [];

    if (!insideBoard(position, boardSize)) {

        return ns;
    }

    if (position.row > 0 && position.col > 0) {

        ns.push({ row: position.row - 1, col: position.col - 1 });
    }

    if (position.row > 0 && position.col < boardSize - 1) {

        ns.push({ row: position.row - 1, col: position.col + 1 });
    }

    if (position.row < boardSize - 1 && position.col > 0) {

        ns.push({ row: position.row + 1, col: position.col - 1 });
    }

    if (position.row < boardSize - 1 && position.col < boardSize - 1) {

        ns.push({ row: position.row + 1, col: position.col + 1 });
    }

    return ns;
}

export function play(game: Game, play: Play): Game {

    if (game.turn.team !== play.team) {

        return {
            ...game,
            outcome: [{
                type: "invalid",
                explanation: InvalidPlays.NotYourTurn
            }]
        };
    } else if (game.players[game.turn.team].usedActions > game.players[game.turn.team].cities.length) {

        return {
            ...game,
            outcome: [{
                type: "invalid",
                explanation: InvalidPlays.NoActions
            }]
        };
    } else if (play.selection.length === 0) {

        return {
            ...game,
            outcome: [{
                type: "invalid",
                explanation: InvalidPlays.NoSelection
            }]
        };
    } else {

        const swarm = selectSwarm(game, game.meeples[play.selection[0]].position);

        if (play.selection
            .some((meepleKey) => !swarm.some((swarmKey) => swarmKey === meepleKey))) {

            return {
                ...game,
                outcome: [{
                    type: "invalid",
                    explanation: InvalidPlays.NoSelection
                }]
            };
        }
    }

    const gameStep = playSwarm(game, play.action, play.selection);

    if (gameStep.outcome.some((oc) => oc.type !== "invalid")) {

        gameStep.players[gameStep.turn.team] = {
            ...gameStep.players[gameStep.turn.team],
            usedActions: gameStep.players[gameStep.turn.team].usedActions + 1
        };
    }

    if (isOver(gameStep)) {

        return {
            ...gameStep,
            outcome: [{ type: "gameover" }]
        };
    }

    const gameTurn = nextTurn(gameStep);

    if (gameTurn.turn.side !== gameStep.turn.side) {

        const players = gameTurn.players.map((player) => { return {
            ...player,
            usedActions: 0
        }; });

        return {
            ...nextTurn({
                ...gameTurn,
                players: players
            }),
            outcome: [{
                type: "action",
                action: play.action
            }]
        };
    } else {

        return {
            ...gameTurn,
            outcome: [{
                type: "action",
                action: play.action
            }]
        };
    }
}

function playSwarm(game: Game, action: Action, swarm: number[]): Game {

    const meeplePositionIndices = swarm.map((meepleIndex) =>
        positionToIndex(game.meeples[meepleIndex].position, game.boardSize))
            .sort((a, b) => a - b);

    if (action === Action.right || action === Action.down) {
        // make sure a meeple won't jump on a meeple of the same swarm
        meeplePositionIndices.reverse();
    }

    return meeplePositionIndices
        .map((mpi) => game.terrains[mpi].topMeeple)
        .reduce((acc, meepleIndex) => playMeeple(acc, action, meepleIndex), {...game, outcome: [] as Outcome[]});
}

function patternMatch(game: Game, position: Position, shape: Position[]): Position[] {

    let shapeHandling = shape.slice();

    for (let flip = 0; flip < 2; flip++) {
        for (let rotate = 0; rotate < 4; rotate++) {
            for (let shapeAt = 0; shapeAt < 4; shapeAt++) {

                const firstPosition: Position = {
                    row: position.row - shapeHandling[shapeAt].row,
                    col: position.col - shapeHandling[shapeAt].col
                };

                const shapeOnMap = shapeHandling.map((pos) => ({
                    row: firstPosition.row + pos.row,
                    col: firstPosition.col + pos.col
                }));

                if (shapeOnMap.every((pos) =>
                    insideBoard(pos, game.boardSize)
                    && isMeepleAvailable(game, pos)
                    && game.terrains[positionToIndex(pos, game.boardSize)].construction.type === "emptysite"
                    && teamControls(game, pos))) {

                    return shapeOnMap.slice();
                }
            }
            shapeHandling = rotateShape(shapeHandling);
        }
        shapeHandling = flipShape(shapeHandling);
    }

    return [];
}

function activatePattern(game: Game, position: Position, piece: Piece): Game {

    return game;
}

function build(game: Game, position: Position, piece: Piece): Game {

    const player = game.players[game.turn.team];
    const terrain = game.terrains[positionToIndex(position, game.boardSize)];
    const meeple = game.meeples[terrain.topMeeple];

    const shape = pieceShapes[piece].shape;
    const shapeOnMap = patternMatch(game, position, shape.slice());

    if (shapeOnMap.length === 4) {

        return {
            ...game,
            players: game.players.map((p) =>
                p.team === player.team ?
                {
                    ...p,
                    buildingPhase: player.buildingPhase.map((bPhase, bIndex) =>
                        bIndex === piece ? "built" : bPhase
                    )
                } : p
            ),
            terrains: game.terrains.map((t) =>
                t.position.row === terrain.position.row && t.position.col === terrain.position.col ?
                ({
                    ...terrain,
                    spaceLeft: Piece[piece] === "s" ? 1 : 0,
                    construction: {
                        type: "building",
                        team: game.turn.team,
                        blueprint: Piece[piece],
                        name: Buildings[Piece[piece]],
                        side: Side.none
                    }
                } as Terrain) : t
            ),
            meeples: game.meeples.map((m) =>
                shapeOnMap.some((p) =>
                    m.key === game.terrains[positionToIndex(p, game.boardSize)].topMeeple) ?
                {
                    ...m,
                    side: flipSide(meeple.side)
                } : {...m}
            ),
            outcome: [...game.outcome, {
                type: "action",
                action: Action.explore
            }]
        };
    }

    return {
        ...game,
        meeples: game.meeples.map((m) =>
            m.key === meeple.key ?
            {
                ...meeple,
                side: flipSide(meeple.side)
            } : m
        )
    };
}

function exploreTerrain(game: Game, position: Position): Game {

    if (teamControls(game, position)) {

        const gameTerrains = game.terrains.slice();
        const gamePlayers = game.players.slice();

        const player = gamePlayers[game.turn.team];
        const terrain = game.terrains[positionToIndex(position, game.boardSize)];

        if (terrain.construction.type === "emptysite") {

            gamePlayers[game.turn.team] = {
                ...player,
                resources: terrain.construction.resources
                    .map((amount, i) => player.resources[i] + amount)
            };

            gameTerrains[positionToIndex(position, game.boardSize)] = {
                ...terrain,
                construction: {
                    ...terrain.construction,
                    resources: terrain.construction.resources.map((amount, i) => 0)
                }
            };
        }

        for (let pieceShape of pieceShapes.filter((o, n) => player.buildingPhase[n] === "blueprint")) {

            return build({
                ...game,
                terrains: gameTerrains.slice(),
                players: gamePlayers.slice(),
                outcome: [...game.outcome, {
                    type: "action",
                    action: Action.explore
                }]
            }, position, pieceShape.i);
        }

        for (let pieceShape of pieceShapes.filter((o, n) => player.buildingPhase[n] === "built")) {

            return activatePattern({
                ...game,
                terrains: gameTerrains.slice(),
                players: gamePlayers.slice(),
                outcome: [...game.outcome, {
                    type: "action",
                    action: Action.explore
                }]
            }, position, pieceShape.i);
        }

        return {
            ...game,
            terrains: gameTerrains.slice(),
            players: gamePlayers.slice(),
            outcome: [...game.outcome, {
                type: "action",
                action: Action.explore
            }]
        };
    } else {

        return {
            ...game,
            outcome: [...game.outcome, {
                type: "invalid",
                explanation: InvalidPlays.NotOnGround
            }]
        };
    }
}

function convertMeeple(game: Game, meepleOver: Meeple, meepleUnder: Meeple): Game {

    const gamePlayers = game.players.slice();
    const gameMeeples = game.meeples.slice();

    if (meepleUnder.team < gamePlayers.length) {

        gamePlayers[meepleUnder.team] = {
            ...gamePlayers[meepleUnder.team],
            usedActions: gamePlayers[meepleUnder.team].swarmSize - 1
        };
    }

    gamePlayers[meepleOver.team] = {
        ...gamePlayers[meepleOver.team],
        usedActions: gamePlayers[meepleOver.team].swarmSize + 1
    };

    gameMeeples[meepleOver.key] = {
        ...meepleOver,
        resistance: meepleOver.resistance + meepleUnder.resistance
    };
    gameMeeples[meepleUnder.key] = {
        ...meepleUnder,
        team: meepleOver.team
    };

    return {
        ...game,
        players: gamePlayers,
        meeples: gameMeeples
    };
}

function fightMeeple(game: Game, meepleOver: Meeple, meepleUnder: Meeple): Game {

    const gamePlayers = game.players.slice();
    const gameMeeples = game.meeples.slice();
    const gameTerrains = game.terrains.slice();

    const terrain = gameTerrains[positionToIndex(meepleOver.position, game.boardSize)];
    let terrainSpaceLeft = terrain.spaceLeft;
    let terrainTopMeeple = terrain.topMeeple;

    meepleUnder = {
        ...meepleUnder,
        resistance: meepleUnder.resistance - meepleOver.strength
    };
    meepleOver = {
        ...meepleOver,
        resistance: meepleOver.resistance - meepleUnder.strength
    };

    const meepleUnderKey = meepleUnder.key;

    if (meepleUnder.resistance <= 0) {

        meepleUnder = {
            ...meepleUnder,
            key: -1
        };
        meepleOver = {
            ...meepleOver,
            topsMeeple: meepleUnder.topsMeeple,
            faith: meepleOver.faith + meepleUnder.faith
        };

        terrainSpaceLeft++;

        if (meepleUnder.team < gamePlayers.length) {

            gamePlayers[meepleUnder.team] = {
                ...gamePlayers[meepleUnder.team],
                usedActions: gamePlayers[meepleUnder.team].swarmSize - 1
            };
        }
    }

    const meepleOverKey = meepleOver.key;
    if (meepleOver.resistance <= 0) {

        meepleOver = {
            ...meepleOver,
            key: -1
        };
        terrainTopMeeple = meepleOver.topsMeeple;
        meepleUnder = {
            ...meepleUnder,
            faith: meepleUnder.faith + meepleOver.faith
        };
        terrainSpaceLeft++;

        gamePlayers[meepleOver.team] = {
            ...gamePlayers[meepleOver.team],
            usedActions: gamePlayers[meepleOver.team].swarmSize - 1
        };
    }

    gameMeeples[meepleUnderKey] = {
        ...meepleUnder
    };
    gameMeeples[meepleOverKey] = {
        ...meepleOver
    };

    gameTerrains[positionToIndex(terrain.position, game.boardSize)] = {
        ...terrain,
        spaceLeft: terrainSpaceLeft,
        topMeeple: terrainTopMeeple
    };

    return {
        ...game,
        players: gamePlayers.slice(),
        meeples: gameMeeples.slice(),
        terrains: gameTerrains.slice()
    };
}

function solveMeepleConflict(game: Game, position: Position): Game {

    const meepleOver = game.meeples[game.terrains[positionToIndex(position, game.boardSize)].topMeeple];
    const meepleUnder = game.meeples[meepleOver.topsMeeple];

    if (meepleOver.faith > meepleUnder.faith + meepleUnder.strength) {

        return convertMeeple(game, meepleOver, meepleUnder);
    }

    return fightMeeple(game, meepleOver, meepleUnder);
}

function marchInto(game: Game, meeple: Meeple, position: Position): Game {

    const terrain = game.terrains[positionToIndex(position, game.boardSize)];

    if (terrain.construction.type !== "city") {

        return game;
    }

    const city: City = terrain.construction;
    const attack = meeplesBelow(game, meeple.key)
        .reduce((acc, m) => acc + m.strength, 0);

    if (attack >= city.defense) {

        const players = game.players.slice();

        if (city.team !== Team.default) {

            const attackedPlayer = {
                ...players[city.team],
                cities: players[city.team].cities.filter((cityKey) => cityKey !== city.key)
            };
            players[attackedPlayer.team] = {
                ...attackedPlayer
            };
        }

        const terrains = game.terrains.slice();
        terrains[positionToIndex(position, game.boardSize)] = {
            ...terrain,
            construction: {
                ...city,
                team: meeple.team
            }
        };

        const playerCities = players[meeple.team].cities.slice();
        playerCities.push(city.key);

        players[meeple.team] = {
            ...players[meeple.team],
            cities: playerCities.slice(),
            buildingPhase: players[meeple.team].buildingPhase
                .map((phase, i) => i === terrain.geography - 2 && phase === "notbuilt" ? "blueprint" : phase)
        };

        const meeples = game.meeples.slice();
        meeples[meeple.key] = {
            ...meeple,
            strength: meeple.strength + Math.floor(Math.sqrt(meeple.strength * city.defense))
        };

        return {
            ...game,
            terrains: terrains.slice(),
            meeples: meeples.slice(),
            players: players.slice()
        };
    }

    return game;
}

function activateBuilding(game: Game, meeple: Meeple, terrain: Terrain): Game {

    if (terrain.construction.type === "building") {

        switch (terrain.construction.blueprint) {

            case "i":

            break;

            case "l":

            return {
                ...game,
                meeples: game.meeples.map((m) =>
                    m.key === meeple.key ?
                    {
                        ...meeple,
                        faith: meeple.team === game.turn.team ?
                            Math.ceil(meeple.faith * 1.1) :
                            Math.floor(meeple.faith * 0.9)
                    } : m
                )
            };

            case "o":

            return {
                ...game,
                meeples: game.meeples.map((m) =>
                    m.key === meeple.key ?
                    {
                        ...meeple,
                        strength: meeple.team === game.turn.team ?
                            Math.ceil(meeple.strength * 1.1) :
                            Math.floor(meeple.strength * 0.9)
                    } : m
                )
            };

            case "s":

            if (terrain.construction.team === meeple.team) {

                if (meeple.topsMeeple !== -1
                    && game.meeples[meeple.topsMeeple].team === meeple.team) {

                    const meepleUnder = game.meeples[meeple.topsMeeple];
                    return {
                        ...game,
                        terrains: game.terrains.map((t) =>
                            t.position.row === terrain.position.row && t.position.col === terrain.position.col ?
                            {
                                ...t,
                                spaceLeft: terrain.spaceLeft + 1,
                                construction: {
                                    ...terrain.construction,
                                    side: Side.none
                                }
                            } : {...t}
                        ),
                        meeples: game.meeples
                            .map((m) =>
                                m.key === meeple.key ?
                                {
                                    ...meeple,
                                    strength: meeple.strength + meepleUnder.strength,
                                    resistance: meeple.resistance + meepleUnder.resistance,
                                    faith: meeple.faith + meepleUnder.faith,
                                    speed: meeple.speed + meepleUnder.speed,
                                    topsMeeple: meepleUnder.topsMeeple
                                } :
                                m.key === meeple.topsMeeple ?
                                {
                                    ...m,
                                    key: -1
                                } :
                                {...m}
                            )
                    };
                }
            } else if (terrain.spaceLeft > 0) {

                return {
                    ...game,
                    terrains: game.terrains.map((t) =>
                        t.position.row === terrain.position.row && t.position.col === terrain.position.col ?
                        {
                            ...t,
                            spaceLeft: terrain.spaceLeft - 1,
                            construction: {
                                ...terrain.construction,
                                side: Side.none
                            }
                        } : {...t}
                    ),
                    meeples: [
                        ...game.meeples.map((m) =>
                            m.key === meeple.key ?
                            {
                                ...meeple,
                                strength: Math.ceil(meeple.strength / 2),
                                resistance: Math.ceil(meeple.resistance / 2),
                                faith: Math.ceil(meeple.faith / 2),
                                speed: Math.ceil(meeple.speed / 2),
                                topsMeeple: game.meeples.length
                            } : m
                        ),
                        {
                            key: game.meeples.length,
                            position: meeple.position,
                            team: meeple.team,
                            side: meeple.side,
                            strength: Math.ceil(meeple.strength / 2),
                            resistance: Math.ceil(meeple.resistance / 2),
                            faith: Math.ceil(meeple.faith / 2),
                            speed: Math.ceil(meeple.speed / 2),
                            topsMeeple: -1
                        }
                    ]
                };
            }

            case "t":

            return {
                ...game,
                meeples: game.meeples.map((m) =>
                    m.key === meeple.key ?
                    {
                        ...meeple,
                        resistance: meeple.team === game.turn.team ?
                            Math.ceil(meeple.resistance * 1.1) :
                            Math.floor(meeple.resistance * 0.9)
                    } : m
                )
            };
        }
    }

    return {
        ...game
    };
}

function moveMeeple(game: Game, action: Action, meeple: Meeple): Game {

    const from: Position = {...meeple.position};
    let to: Position = {...meeple.position};

    const terrainFrom: Terrain = game.terrains[positionToIndex(from, game.boardSize)];
    let terrainTo: Terrain = game.terrains[positionToIndex(to, game.boardSize)];

    for (let i = 0; i < meeple.speed; i++) {

        const stepFrom = {...to};

        switch (action) {

            case Action.up:
            to = {
                ...to,
                row: stepFrom.row - 1
            };
            break;

            case Action.left:
            to = {
                ...to,
                col: stepFrom.col - 1
            };
            break;

            case Action.down:
            to = {
                ...to,
                row: stepFrom.row + 1
            };
            break;

            case Action.right:
            to = {
                ...to,
                col: stepFrom.col + 1
            };
            break;
        }

        terrainTo = game.terrains[positionToIndex(to, game.boardSize)];

        if (!adjacent(stepFrom, game.boardSize).some((pos) => pos.row === to.row && pos.col === to.col)) {

            if (i === 0) {

                return {
                    ...game,
                    outcome: [...game.outcome, {
                        type: "invalid",
                        explanation: InvalidPlays.OutOfBoard
                    }]
                };
            } else {

                to = {...stepFrom};
                terrainTo = game.terrains[positionToIndex(to, game.boardSize)];
            }
        }

        if (terrainTo.spaceLeft < 1) {

            if (i === 0) {

                return {
                    ...game,
                    outcome: [...game.outcome, {
                        type: "invalid",
                        explanation: InvalidPlays.TerrainIsCrowded
                    }]
                };
            } else {

                to = {...stepFrom};
                terrainTo = game.terrains[positionToIndex(to, game.boardSize)];
            }
        }

        if (terrainTo.construction.type === "building"
            && terrainTo.construction.side !== flipSide(meeple.side)) {

            if (i === 0) {

                return {
                    ...game,
                    outcome: [...game.outcome, {
                        type: "invalid",
                        explanation: InvalidPlays.BuildingCooldown
                    }]
                };
            } else {

                to = {...stepFrom};
                terrainTo = game.terrains[positionToIndex(to, game.boardSize)];
            }
        }
    }

    meeple = {
        ...meeple,
        side: flipSide(meeple.side)
    };

    const gameMeeples = game.meeples.slice();

    const topMeepleFrom = meeple.topsMeeple;
    let constructionFrom: Construction = terrainFrom.construction;

    if (topMeepleFrom !== -1) {

        const freedMeeple = gameMeeples[terrainFrom.topMeeple];

        if (freedMeeple.team < game.players.length) {

            gameMeeples[terrainFrom.topMeeple] = {
                ...freedMeeple,
                side: freedMeeple.team > meeple.team ? game.turn.side : meeple.side
            };
        }
    } else {

        if (constructionFrom.type === "building") {

            constructionFrom = {
                ...constructionFrom,
                side: flipSide(meeple.side)
            };
        } else if (constructionFrom.type === "emptysite") {

            constructionFrom = {
                ...constructionFrom,
                resources: constructionFrom.resources
                    .map((amount, i) => amount
                        + (GeographyInfo[terrainFrom.geography].resources
                            .some((resource) => resource === i) ? 1 : 0))
            };
        }
    }

    meeple = {
        ...meeple,
        topsMeeple: terrainTo.topMeeple,
        position: to
    };

    gameMeeples[meeple.key] = meeple;

    const topMeepleTo = meeple.key;
    let spaceLeftTo = terrainTo.spaceLeft;
    spaceLeftTo--;

    const gameTerrains = game.terrains.slice();
    gameTerrains[positionToIndex(from, game.boardSize)] = {
        ...terrainFrom,
        construction: {
            ...constructionFrom
        },
        topMeeple: topMeepleFrom,
        spaceLeft: terrainFrom.spaceLeft + 1
    };
    gameTerrains[positionToIndex(to, game.boardSize)] = {
        ...terrainTo,
        topMeeple: topMeepleTo,
        spaceLeft: spaceLeftTo
    };

    const stepGame: Game = {
        ...game,
        terrains: gameTerrains.slice(),
        meeples: gameMeeples.slice(),
            outcome: [...game.outcome, {
            type: "action",
            action: action
        }]
    };

    let conflictGame = {
        ...stepGame
    };
    if (meeple.topsMeeple !== -1 && gameMeeples[meeple.key].team !== gameMeeples[meeple.topsMeeple].team) {

        conflictGame = solveMeepleConflict(stepGame, to);
    }

    let enterConstructionGame = {
        ...conflictGame
    };
    if (terrainTo.construction.type === "city") {

        if (terrainTo.construction.team !== meeple.team
            && teamControls(conflictGame, meeple.position)) {

            enterConstructionGame = marchInto(conflictGame, meeple, to);
        }
    } else if (terrainTo.construction.type === "building") {

        enterConstructionGame = activateBuilding(conflictGame, meeple, terrainTo);
    }

    return enterConstructionGame;
}

function playMeeple(game: Game, action: Action, meepleIndex: number): Game {

    if (meepleIndex < 0 || !(meepleIndex < game.meeples.length)) {

        return {
            ...game,
            outcome: [...game.outcome, {
                type: "invalid",
                explanation: InvalidPlays.MeepleNotAvailable
            }]
        };
    }

    const meeple = game.meeples[meepleIndex];

    if (!isMeepleAvailable(game, meeple.position)) {

        return {
            ...game,
            outcome: [...game.outcome, {
                type: "invalid",
                explanation: InvalidPlays.MeepleNotAvailable
            }]
        };
    }

    const gameMeeples = game.meeples.slice();

    switch (action) {

        case Action.hold:

        gameMeeples[meepleIndex] = {
            ...meeple,
            side: flipSide(meeple.side)
        };

        return {
            ...game,
            meeples: gameMeeples,
            outcome: [...game.outcome, {
                type: "action",
                action: action
            }]
        };

        case Action.explore:

        return exploreTerrain(game, meeple.position);

        case Action.up:
        case Action.left:
        case Action.down:
        case Action.right:

        return moveMeeple(game, action, meeple);
    }
}

export function begin(game: Game): Game {

    return {
        ...game,
        turn: {
            round: 0,
            side: Side.heads,
            team:
                game.players.length > 0 ?
                game.players[0].team :
                Team.default
        }
    };
}

function flipShape(positions: Position[]): Position[] {

    return positions.map(({row, col}) => ({row: row, col: -1 * col}));
}

function rotateShape(positions: Position[]): Position[] {

    return positions.map(({row, col}) => ({row: -1 * col, col: row}));
}

export function setup(playerCount: number = 0, boardSize: number = 20): Game {

    const cityNames = [
        "Argos",
        "Athens",
        "Byblos",
        "Damascus",
        "Luxor",
        "Jericho",
        "Beirut",
        "Plovdiv",
        "Aleppo",
        "Sidon",
        "Rey",
        "Jerusalem",
        "Luoyang",
        "Varanasi",
        "Balkh",
        "Xi'an",
        "Handan",
        "Beijing",
        "Zibo",
        "Susa",
        "Gaziantep",
        "Tyre",
        "Jenin",
        "Homs",
        "Erbil",
        "Kirkuk",
        "Jaffa",
        "Hebron",
        "Gaza",
        "Kutaisi",
        "Chania",
        "Thebes",
        "Larnaca",
        "Trikala",
        "Chalcis",
        "Lisbon",
        "Gadir",
        "Patras",
        "Chios",
        "Nicosia",
        "Zadar",
        "Mtskheta",
        "Mytilene"
    ];

    const terrains = new Array<Terrain>();
    const patchesPerDimension = Math.ceil(Math.sqrt(5 * (playerCount + 1)));
    const patchLength = boardSize / patchesPerDimension;
    const defaultPatchArea = Math.PI * ((patchLength - 0.5) / 2) ** 2;

    const patchSeeds: Position[] =
        [...Array(patchesPerDimension ** 2).keys()].map((idx) =>
            ({
                row: Math.round((patchLength / 2) + (patchLength * Math.floor(idx / patchesPerDimension))),
                col: Math.round((patchLength / 2) + (patchLength * (idx % patchesPerDimension)))
            })
        );

    const requiredGeography = [...Array(5 * (playerCount + 1)).keys()].map((i) => (i % 5) + 2);

    let patchIndex = 0;

    while (patchSeeds.length > 0
        && patchIndex < patchesPerDimension ** 2) {

        const seedPosition: Position = patchSeeds.splice(Math.floor(Math.random() * patchSeeds.length), 1)[0];

        if (!terrains[positionToIndex(seedPosition, boardSize)]) {

            const patch: Position[] = [seedPosition];

            let patchLimit = patchLength ** 2;
            do {
                patchLimit--;
                let candidatePosition;
                let candidateLimit = defaultPatchArea;

                do {
                    candidateLimit--;

                    candidatePosition =
                        adjacent(patch[Math.floor(Math.random() * patch.length)], boardSize)
                        .filter((pos) => patch.every((p) => p.row !== pos.row || p.col !== pos.col))
                        .filter((pos) => !terrains[positionToIndex(pos, boardSize)])
                        .filter((pos) => neighbours(pos, boardSize)
                            .every((p) => !terrains[positionToIndex(p, boardSize)]))
                        .find((pos, i, o) => Math.random() < (1 / (o.length - i)));

                } while (!candidatePosition && candidateLimit > 0);

                if (candidateLimit > 0) {

                    patch.push(candidatePosition!);
                }

            } while (patchLimit > 0
                && Math.random() > (1 - Math.tanh((defaultPatchArea - patch.length) / Math.sqrt(2))) / 2);

            let cityPosition: Position;
            do {
                cityPosition = patch[Math.floor(Math.random() * patch.length)];

            } while (adjacent(cityPosition, boardSize).length !== 4
                || !adjacent(cityPosition, boardSize).every((pos) => insideBoard(pos, boardSize)));

            patch.push(...neighbours(cityPosition, boardSize)
                .filter((pos) => patch.every((p) => p.row !== pos.row || p.col !== pos.col)));

            const geographyIndex =
                requiredGeography.length > 0 ?
                requiredGeography.splice(Math.random() * requiredGeography.length, 1)[0] :
                Math.ceil(Math.random() * 5) + 1;
            const boundaries: Position[] = [];

            patch.forEach((position) => {

                let spaceLeft = geographyIndex;
                let construction: Construction = {
                    type: "emptysite",
                    resources: [...Array(4).keys()].map((o) => 0)
                };

                if (position.row === cityPosition.row
                    && position.col === cityPosition.col) {

                    spaceLeft--;
                    construction = {
                        type: "city",
                        key: positionToIndex(position, boardSize),
                        name: cityNames.splice(Math.floor(Math.random() * cityNames.length), 1)[0],
                        defense: 15 + Math.ceil(Math.random() * 20),
                        team: Team.default
                    };
                }

                terrains[positionToIndex(position, boardSize)] = {
                    geography: geographyIndex,
                    position: position,
                    spaceLeft: spaceLeft,
                    topMeeple: -1,
                    construction: construction
                };

                boundaries.push(...neighbours(position, boardSize)
                    .filter((pos) => patch.every((p) => pos.row !== p.row || pos.col !== p.col))
                    .filter((pos) => insideBoard(position, boardSize))
                    .filter((pos) => !terrains[positionToIndex(pos, boardSize)]));
            });

            boundaries.forEach((position) => {
                terrains[positionToIndex(position, boardSize)] = {
                    geography: Geography.desert,
                    position: position,
                    spaceLeft: 1,
                    topMeeple: -1,
                    construction: {
                        type: "emptysite",
                        resources: [...Array(4).keys()].map((o) => 0)
                    }
                };
            });
        }

        patchIndex++;
    }

    let meepleKey: number = playerCount;
    const meeples: Meeple[] = new Array<Meeple>();

    for (let i: number = 0; i < boardSize; i++) {

        for (let j: number = 0; j < boardSize; j++) {

            const position = {
                row: i,
                col: j
            };

            const terrain: Terrain = terrains[positionToIndex(position, boardSize)] ?
                terrains[positionToIndex(position, boardSize)] :
                {
                    geography: neighbours(position, boardSize)
                        .every((pos) =>
                            terrains[positionToIndex(pos, boardSize)] === undefined
                            || terrains[positionToIndex(pos, boardSize)].geography === Geography.sea
                            || terrains[positionToIndex(pos, boardSize)].geography === Geography.desert) ?
                        Geography.sea :
                        Geography.desert,
                    position: position,
                    spaceLeft: 1,
                    topMeeple: -1,
                    construction: {
                        type: "emptysite",
                        resources: [...Array(4).keys()].map((o) => 0)
                    }
                };

            const geographyIndex = terrain.geography;
            let topMeeple: number = -1;
            let spaceLeft: number = terrain.geography === Geography.sea ? 0 : terrain.spaceLeft;

            if (terrain.construction.type === "emptysite" && Math.random() < 0.1 * (spaceLeft - 1)) {

                const meeple: Meeple = {

                    key: meepleKey++,
                    position: position,
                    team: Team.default,
                    side: Side.heads,
                    strength: Math.ceil(Math.random() * 5),
                    resistance: Math.ceil(Math.random() * 15),
                    faith: Math.ceil(Math.random() * 15),
                    speed: 1,
                    topsMeeple: -1
                };

                topMeeple = meeple.key;
                spaceLeft--;
                meeples[meeple.key] = meeple;
            }

            terrains[positionToIndex(position, boardSize)] = {
                ...terrain,
                spaceLeft: spaceLeft,
                topMeeple: topMeeple
            };
        }
    }

    const players: Player[] = new Array<Player>();
    let i: number = 0;
    meepleKey = 0;

    for (let team = Team.info; team < playerCount; team++) {

        let position: Position;

        do { // find a random empty tile
            position = {
                row: Math.floor(Math.random() * (boardSize - 2)) + 1,
                col: Math.floor(Math.random() * (boardSize - 2)) + 1
            };
        } while (terrains[positionToIndex(position, boardSize)].construction.type !== "emptysite"
            || terrains[positionToIndex(position, boardSize)].topMeeple > -1
            || terrains[positionToIndex(position, boardSize)].spaceLeft < 1);

        const meeple: Meeple = {
            key: meepleKey++,
            position: position,
            team: team,
            side: Side.heads,
            strength: 10 + Math.ceil(Math.random() * 5),
            resistance: 20 + Math.ceil(Math.random() * 10),
            faith: 20 + Math.ceil(Math.random() * 10),
            speed: 1,
            topsMeeple: -1
        };

        const pti = positionToIndex(position, boardSize);
        terrains[pti] = {
            ...terrains[pti],
            topMeeple: meeple.key,
            spaceLeft: terrains[pti].spaceLeft - 1
        };
        meeples[meeple.key] = {
            ...meeple
        };

        players[team] = {
            team: team,
            cities: [],
            swarmSize: meeples.filter((m) => m.team === team).length,
            buildingPhase: [...Array(5).keys()].map((o) => "notbuilt" as BuildingPhase),
            usedActions: 0,
            resources: [...Array(4).keys()].map((o) => 0)
        };
    }

    const game: Game = {

        boardSize: boardSize,
        players: players,
        terrains: terrains,
        meeples: meeples,
        deck: [],
        discardPile: [],
        turn: {
            round: 0,
            team: Team.default,
            side: Side.none
        },
        outcome: [{ type: "none" }]
    };

    return game;
}

export function tutorial(index: number): Game {

    const t = (row: number, col: number, topMeeple: number = -1): Terrain => {

        const geographyIndex = (row + col) % 7;

        return {
            position: { row: row, col: col },
            geography: geographyIndex,
            spaceLeft: geographyIndex,
            topMeeple: topMeeple,
            construction: {
                type: "emptysite",
                resources: [...Array(4).keys()].map((o) => 0)
            }
        };
    };

    const tutorialStepsScenarios: Game[] = [
        // tutorial start
        begin(setup(5)),
        { // the board
            boardSize: 20,
            players: [],
            terrains: [...Array(20).keys()].reduce((acc, row) =>
                acc.concat([...Array(20).keys()].map((col) => t(row, col))), [] as Terrain[]),
            meeples: [],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        },
        { // a blue meeple
            boardSize: 3,
            players: [],
            terrains: [...Array(3).keys()].reduce((acc, row) =>
                acc.concat([...Array(3).keys()].map((col) =>
                row === 1 && col === 1 ? t(row, col, 0) : t(row, col))), [] as Terrain[]),
            meeples: [
                {
                    key: 0,
                    position: { row: 1, col: 1 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                }
            ],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        },
        { // the meeple colors
            boardSize: 6,
            players: [],
            terrains: [...Array(6).keys()].reduce((acc, row) =>
                acc.concat([...Array(6).keys()].map((col) =>
                row === col ? t(row, col, row) : t(row, col))), [] as Terrain[]),
            meeples: [
                {
                    key: 0,
                    position: { row: 0, col: 0 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 1, col: 1 },
                    team: Team.warning,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 2,
                    position: { row: 2, col: 2 },
                    team: Team.success,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 3,
                    position: { row: 3, col: 3 },
                    team: Team.danger,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 4,
                    position: { row: 4, col: 4 },
                    team: Team.primary,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 5,
                    position: { row: 5, col: 5 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
            ],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        },
        { // the moves
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    cities: [],
                    swarmSize: 1,
                    buildingPhase: [...Array(5).keys()].map((o) => "notbuilt" as BuildingPhase),
                    usedActions: 0,
                    resources: [...Array(4).keys()].map((o) => 0)
                },
            ],
            terrains: [...Array(4).keys()].reduce((acc, row) =>
                acc.concat([...Array(4).keys()].map((col) =>
                row === 1 && col === 1 ? t(row, col, 0) : t(row, col))), [] as Terrain[]),
            meeples: [
                {
                    key: 0,
                    position: { row: 1, col: 1 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
            ],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        },
        { // moving over meeples
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    cities: [],
                    swarmSize: 1,
                    buildingPhase: [...Array(5).keys()].map((o) => "notbuilt" as BuildingPhase),
                    usedActions: 0,
                    resources: [...Array(4).keys()].map((o) => 0)
                },
            ],
            terrains: [...Array(4).keys()].reduce((acc, row) =>
                acc.concat([...Array(4).keys()].map((col) =>
                    row === 1 && col === 2 ?
                    t(row, col, 0) :
                    (row === 1 && col === 1 ?
                    t(row, col, 1) :
                    t(row, col))
                )), [] as Terrain[]),
            meeples: [
                {
                    key: 0,
                    position: { row: 1, col: 2 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
            ],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        },
        { // converting a meeple
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    cities: [],
                    swarmSize: 1,
                    buildingPhase: [...Array(5).keys()].map((o) => "notbuilt" as BuildingPhase),
                    usedActions: 0,
                    resources: [...Array(4).keys()].map((o) => 0)
                },
            ],
            terrains: [...Array(4).keys()].reduce((acc, row) =>
                acc.concat([...Array(4).keys()].map((col) =>
                    row === 3 && col === 2 ?
                    t(row, col, 0) :
                    (row === 1 && col === 1 ?
                    t(row, col, 1) :
                    t(row, col))
                )), [] as Terrain[]),
            meeples: [
                {
                    key: 0,
                    position: { row: 3, col: 2 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
            ],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        },
        { // battling meeples
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    cities: [],
                    swarmSize: 1,
                    buildingPhase: [...Array(5).keys()].map((o) => "notbuilt" as BuildingPhase),
                    usedActions: 0,
                    resources: [...Array(4).keys()].map((o) => 0)
                },
            ],
            terrains: [...Array(4).keys()].reduce((acc, row) =>
                acc.concat([...Array(4).keys()].map((col) =>
                    row === 3 && col === 2 ?
                    t(row, col, 0) :
                    (row === 1 && col === 1 ?
                    t(row, col, 1) :
                    t(row, col))
                )), [] as Terrain[]),
            meeples: [
                {
                    key: 0,
                    position: { row: 3, col: 2 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 10,
                    resistance: 20,
                    faith: 20,
                    speed: 1,
                    topsMeeple: -1
                },
            ],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        },
        { // dying meeple
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    cities: [],
                    swarmSize: 1,
                    buildingPhase: [...Array(5).keys()].map((o) => "notbuilt" as BuildingPhase),
                    usedActions: 0,
                    resources: [...Array(4).keys()].map((o) => 0)
                },
            ],
            terrains: [...Array(4).keys()].reduce((acc, row) =>
                acc.concat([...Array(4).keys()].map((col) =>
                    row === 3 && col === 2 ?
                    t(row, col, 0) :
                    (row === 1 && col === 1 ?
                    t(row, col, 1) :
                    t(row, col))
                )), [] as Terrain[]),
            meeples: [
                {
                    key: 0,
                    position: { row: 3, col: 2 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 10,
                    resistance: 10,
                    faith: 20,
                    speed: 1,
                    topsMeeple: -1
                },
            ],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        },
        { // the swarm
            boardSize: 6,
            players: [
                {
                    team: Team.info,
                    cities: [],
                    swarmSize: 5,
                    buildingPhase: [...Array(5).keys()].map((o) => "notbuilt" as BuildingPhase),
                    usedActions: 0,
                    resources: [...Array(4).keys()].map((o) => 0)
                },
            ],
            terrains: [
                t(0, 0),    t(0, 1),    t(0, 2),    t(0, 3),    t(0, 4, 5), t(0, 5),
                t(1, 0),    t(1, 1, 6), t(1, 2, 0), t(1, 3),    t(1, 4),    t(1, 5),
                t(2, 0),    t(2, 1),    t(2, 2),    t(2, 3, 1), t(2, 4),    t(2, 5),
                t(3, 0),    t(3, 1, 4), t(3, 2, 3), t(3, 3, 2), t(3, 4),    t(3, 5),
                t(4, 0),    t(4, 1),    t(4, 2),    t(4, 3),    t(4, 4),    t(4, 5),
                t(5, 0),    t(5, 1),    t(5, 2),    t(5, 3),    t(5, 4),    t(5, 5)
            ],
            meeples: [
                {
                    key: 0,
                    position: { row: 1, col: 2 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 2, col: 3 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 2,
                    position: { row: 3, col: 3 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 3,
                    position: { row: 3, col: 2 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 4,
                    position: { row: 3, col: 1 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 5,
                    position: { row: 0, col: 4 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 6,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                }
            ],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        },
        { // hi
            boardSize: 8,
            players: [],
            terrains: [
                t(0, 0),     t(0, 1),     t(0, 2),     t(0, 3),     t(0, 4),     t(0, 5),     t(0, 6),     t(0, 7),
                t(1, 0),     t(1, 1, 5),  t(1, 2),     t(1, 3),     t(1, 4),     t(1, 5),     t(1, 6, 0),  t(1, 7),
                t(2, 0),     t(2, 1, 6),  t(2, 2),     t(2, 3),     t(2, 4),     t(2, 5),     t(2, 6),     t(2, 7),
                t(3, 0),     t(3, 1, 7),  t(3, 2, 11), t(3, 3, 12), t(3, 4),     t(3, 5),     t(3, 6, 1),  t(3, 7),
                t(4, 0),     t(4, 1, 8),  t(4, 2),     t(4, 3),     t(4, 4, 13), t(4, 5),     t(4, 6, 2),  t(4, 7),
                t(5, 0),     t(5, 1, 9),  t(5, 2),     t(5, 3),     t(5, 4, 14), t(5, 5),     t(5, 6, 3),  t(5, 7),
                t(6, 0),     t(6, 1, 10), t(6, 2),     t(6, 3),     t(6, 4, 15), t(6, 5),     t(6, 6, 4),  t(6, 7),
                t(7, 0),     t(7, 1),     t(7, 2),     t(7, 3),     t(7, 4),     t(7, 5),     t(7, 6),     t(7, 7)
            ],
            meeples: [
                {
                    key: 0,
                    position: { row: 1, col: 6 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 3, col: 6 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 2,
                    position: { row: 4, col: 6 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 3,
                    position: { row: 5, col: 6 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 4,
                    position: { row: 6, col: 6 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 5,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 6,
                    position: { row: 2, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 7,
                    position: { row: 3, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 8,
                    position: { row: 4, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 9,
                    position: { row: 5, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 10,
                    position: { row: 6, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 11,
                    position: { row: 3, col: 2 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 12,
                    position: { row: 3, col: 3 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 13,
                    position: { row: 4, col: 4 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 14,
                    position: { row: 5, col: 4 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 15,
                    position: { row: 6, col: 4 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
            ],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        },
        { // the conflicts
            boardSize: 6,
            players: [
                {
                    team: Team.info,
                    cities: [],
                    swarmSize: 2,
                    buildingPhase: [...Array(5).keys()].map((o) => "notbuilt" as BuildingPhase),
                    usedActions: 0,
                    resources: [...Array(4).keys()].map((o) => 0)
                },
            ],
            terrains: [
                t(0, 0),    t(0, 1),    t(0, 2),    t(0, 3),    t(0, 4),    t(0, 5),
                t(1, 0),    t(1, 1),    t(1, 2),    t(1, 3),    t(1, 4),    t(1, 5),
                t(2, 0),    t(2, 1),    t(2, 2, 1), t(2, 3, 0), t(2, 4),    t(2, 5),
                t(3, 0),    t(3, 1),    t(3, 2),    t(3, 3, 2), t(3, 4),    t(3, 5),
                t(4, 0),    t(4, 1, 3), t(4, 2),    t(4, 3),    t(4, 4),    t(4, 5),
                t(5, 0),    t(5, 1),    t(5, 2),    t(5, 3),    t(5, 4),    t(5, 5)
            ],
            meeples: [
                {
                    key: 0,
                    position: { row: 2, col: 3 },
                    team: Team.info,
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 2, col: 2 },
                    team: Team.warning,
                    side: Side.heads,
                    strength: 5,
                    resistance: 10,
                    faith: 30,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 2,
                    position: { row: 3, col: 3 },
                    team: Team.success,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                },
                {
                    key: 3,
                    position: { row: 4, col: 1 },
                    team: Team.default,
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    speed: 1,
                    topsMeeple: -1
                }
            ],
            deck: [],
            discardPile: [],
            turn: {
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: [{ type: "none" }]
        }
    ];

    return tutorialStepsScenarios[index];
}
