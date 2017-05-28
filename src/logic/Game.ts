import Card from "./Card";

import {decks} from "./Card";
import {
    BuildingPhase,
    Buildings,
    City,
    Construction,
    EmptySite,
    Piece,
    pieceShapes
} from "./Construction";
import {Meeple, Side} from "./Meeple";
import {Player, Team} from "./Player";
import {
    Geography,
    GeographyInfo,
    Position,
    positionToIndex,
    Resource,
    Terrain
} from "./Terrain";

export enum Action {
    up,
    left,
    down,
    right,
    explore,
    hold
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
    NoActions: "you need to control more cities to perform more actions."
};

type Turn = {
    readonly round: number;
    readonly team: Team;
    readonly side: Side;
};

export type Outcome = {
    readonly type: "action",
    readonly action: Action
} | {
    readonly type: "harvest"
} | {
    readonly type: "construction",
    readonly construction: string,
    readonly name: string
} | {
    readonly type: "pattern",
    readonly pattern: Piece
} | {
    readonly type: "invalid",
    readonly explanation: string
} | {
    readonly type: "none"
} | {
    readonly type: "gameover"
};

export type Game = {
    readonly boardSize: number;
    readonly players: Player[];
    readonly terrains: Terrain[];
    readonly meeples: Meeple[];
    readonly decks: Card[][];
    readonly discardPiles: Card[][];
    readonly turn: Turn;
    readonly outcome: Outcome[];
};

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

    const stepGame: Game = meeplePositionIndices
        .map((mpi) => game.terrains[mpi].topMeeple)
        .reduce((acc, meepleIndex) => playMeeple(acc, action, meepleIndex), {...game, outcome: [] as Outcome[]});

    const freedPositionIndices = meeplePositionIndices
        .filter((mpi) => stepGame.terrains[mpi].topMeeple === -1);

    return {
        ...stepGame,
        terrains: stepGame.terrains.map(
            (terrain, i) => freedPositionIndices.some((fpi) => i === fpi) ?
            {
                ...terrain,
                construction: {
                    ...terrain.construction,
                    resources: terrain.construction.resources.map((amount, resourceIndex) =>
                        amount + terrain.construction.production[resourceIndex])
                }
            } : terrain
        )
    };
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

    const player = game.players[game.turn.team];
    const terrain = game.terrains[positionToIndex(position, game.boardSize)];
    const meeple = game.meeples[terrain.topMeeple];

    const shape = pieceShapes[piece].shape;
    const shapeOnMap = patternMatch(game, position, shape.slice());

    if (shapeOnMap.length === 4) {

        const patternDeck: Card[] = game.decks[piece].slice();

        if (patternDeck.length > 0) {

            const card: Card = patternDeck.splice(Math.floor(Math.random() * patternDeck.length), 1)[0];

            const patternDiscard = game.discardPiles[piece].slice();
            if (patternDeck.length === 0) {

                patternDeck.concat(patternDiscard.splice(0, patternDiscard.length));
            }

            const hand: Card[] = player.hand.slice();
            hand.push(card);

            return {
                ...game,
                players: game.players.map((p) =>
                    p.team === player.team ?
                    {
                        ...p,
                        hand: hand.slice()
                    } : {...p}
                ),
                meeples: game.meeples.map((m) =>
                    shapeOnMap.some((p) =>
                        m.key === game.terrains[positionToIndex(p, game.boardSize)].topMeeple) ?
                    {
                        ...m,
                        side: flipSide(meeple.side)
                    } : {...m}
                ),
                decks: game.decks.map((deck, i) =>
                    i === piece ?
                    patternDeck.slice() :
                    deck.slice()
                ),
                discardPiles: game.decks.map((discard, i) =>
                    i === piece ?
                    patternDiscard.slice() :
                    discard.slice()
                ),
                outcome: [...game.outcome, {
                    type: "pattern",
                    pattern: piece
                }]
            };
        }
    }

    return {...game};
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
                        resources: [...Array(5).keys()].map((o) => 0),
                        production: [...Array(5).keys()].map((o, i) => i === Resource.cubit ? 1 : 0)
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
                type: "construction",
                construction: "building",
                name: Buildings[Piece[piece]]
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

        const construction = game.terrains[positionToIndex(position, game.boardSize)].construction;
        let exploredGame: Game;

        if (construction.type === "emptysite") {

            const terrainIndex = positionToIndex(position, game.boardSize);

            exploredGame = {
                ...game,
                players: game.players.map(
                    (player) => player.team === game.turn.team ?
                    {
                        ...player,
                        resources: construction.resources
                            .map((amount, i) => player.resources[i] + amount)
                    } : player
                ),
                terrains: game.terrains.map(
                    (terrain, i) => i === terrainIndex ?
                    {
                        ...terrain,
                        construction: {
                            ...construction,
                            resources: construction.resources.map((amount) => 0)
                        }
                    } : terrain
                )
            };
        } else if (construction.type === "building") {

            exploredGame = activateBuilding(game, position);

        } else {

            exploredGame = {...game};
        }

        const cardsGame: Game = pieceShapes
            .filter((o, i) => exploredGame.players[exploredGame.turn.team].buildingPhase[i] === "built")
            .reduce((acc, pattern) => activatePattern(acc, position, pattern.i), exploredGame);

        const buildingsGame: Game = pieceShapes
            .filter((o, n) => cardsGame.players[cardsGame.turn.team].buildingPhase[n] === "blueprint")
            .reduce((acc, pattern) => build(acc, position, pattern.i), cardsGame);

        return {
            ...buildingsGame,
            outcome: [
                ...buildingsGame.outcome,
                {
                    type: "action",
                    action: Action.explore
                }
            ]
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
                resources: [...Array(5).keys()].map((o) => 0),
                production: [...Array(5).keys()].map((o) => 0),
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

function activateBuilding(game: Game, position: Position): Game {

    const terrain: Terrain = game.terrains[positionToIndex(position, game.boardSize)];
    const meeple: Meeple = game.meeples[terrain.topMeeple];
    const construction: Construction = terrain.construction;

    if (construction.type === "building") {

        switch (construction.blueprint) {

            case "i":

            break;

            case "l":

            return {
                ...game,
                terrains: game.terrains.map((t) =>
                    t.position.row === terrain.position.row && t.position.col === terrain.position.col ?
                    {
                        ...t,
                        construction: {
                            ...construction,
                            resources: construction.resources.map(
                                (amount, i) => i === Resource.cubit ?
                                0 : amount
                            )
                        }
                    } : {...t}
                ),
                meeples: game.meeples.map((m) =>
                    m.key === meeple.key ?
                    {
                        ...meeple,
                        faith: meeple.faith
                            + (construction.resources[Resource.cubit] * (meeple.team === game.turn.team ? 1 : -1))
                    } : m
                )
            };

            case "o":

            return {
                ...game,
                terrains: game.terrains.map((t) =>
                    t.position.row === terrain.position.row && t.position.col === terrain.position.col ?
                    {
                        ...t,
                        construction: {
                            ...construction,
                            resources: construction.resources.map(
                                (amount, i) => i === Resource.cubit ?
                                0 : amount
                            )
                        }
                    } : {...t}
                ),
                meeples: game.meeples.map((m) =>
                    m.key === meeple.key ?
                    {
                        ...meeple,
                        strength: meeple.strength
                            + (construction.resources[Resource.cubit] * (meeple.team === game.turn.team ? 1 : -1))
                    } : m
                )
            };

            case "s":

            if (construction.team === meeple.team) {

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
                                    ...construction,
                                    resources: construction.resources.map(
                                        (amount, i) => i === Resource.cubit ?
                                        amount - 1 : amount
                                    )
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
                                ...construction,
                                resources: construction.resources.map(
                                    (amount, i) => i === Resource.cubit ?
                                    amount - 1 : amount
                                )
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
                terrains: game.terrains.map((t) =>
                    t.position.row === terrain.position.row && t.position.col === terrain.position.col ?
                    {
                        ...t,
                        construction: {
                            ...construction,
                            resources: construction.resources.map(
                                (amount, i) => i === Resource.cubit ?
                                0 : amount
                            )
                        }
                    } : {...t}
                ),
                meeples: game.meeples.map((m) =>
                    m.key === meeple.key ?
                    {
                        ...meeple,
                        resistance: meeple.resistance
                            + (construction.resources[Resource.cubit] * (meeple.team === game.turn.team ? 1 : -1))
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
        } else if (terrainTo.spaceLeft < 1) {

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

    let cityGame = {
        ...conflictGame
    };
    if (terrainTo.construction.type === "city") {

        if (terrainTo.construction.team !== meeple.team
            && teamControls(conflictGame, meeple.position)) {

            cityGame = marchInto(conflictGame, meeple, to);
        }
    }

    return cityGame;
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
            round: 1,
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
                    production: [...Array(5).keys()]
                        .map((o, i) => GeographyInfo[geographyIndex].resources
                            .some((resource) => resource === i) ? 1 : 0),
                    resources: [...Array(5).keys()].map((o) => 0)
                };

                if (position.row === cityPosition.row
                    && position.col === cityPosition.col) {

                    spaceLeft--;
                    construction = {
                        type: "city",
                        key: positionToIndex(position, boardSize),
                        name: cityNames.splice(Math.floor(Math.random() * cityNames.length), 1)[0],
                        defense: 15 + Math.ceil(Math.random() * 20),
                        team: Team.default,
                        resources: [...Array(5).keys()].map((o) => 0),
                        production: [...Array(5).keys()].map((o) => 0)
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
                        production: [...Array(5).keys()]
                            .map((o, i) => GeographyInfo[Geography.desert].resources
                                .some((resource) => resource === i) ? 1 : 0),
                        resources: [...Array(5).keys()].map((o) => 0)
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

            const emptyTerrainGeoIndex: Geography = neighbours(position, boardSize)
                .every((pos) =>
                    terrains[positionToIndex(pos, boardSize)] === undefined
                    || terrains[positionToIndex(pos, boardSize)].geography === Geography.sea
                    || terrains[positionToIndex(pos, boardSize)].geography === Geography.desert) ?
                Geography.sea :
                Geography.desert;

            const terrain: Terrain = terrains[positionToIndex(position, boardSize)] ?
                terrains[positionToIndex(position, boardSize)] :
                {
                    geography: emptyTerrainGeoIndex,
                    position: position,
                    spaceLeft: 1,
                    topMeeple: -1,
                    construction: {
                        type: "emptysite",
                        production: [...Array(5).keys()]
                            .map((o, ) => GeographyInfo[emptyTerrainGeoIndex].resources
                                .some((resource) => resource === i) ? 1 : 0),
                        resources: [...Array(5).keys()].map((o) => 0)
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
            resources: [...Array(5).keys()].map((o) => 0),
            hand: [],
            vp: 0
        };
    }

    const game: Game = {

        boardSize: boardSize,
        players: players,
        terrains: terrains,
        meeples: meeples,
        decks: decks.map((deck) => deck.slice()),
        discardPiles: [...Array(5).keys()].map((o) => []),
        turn: {
            round: 0,
            team: Team.default,
            side: Side.none
        },
        outcome: [{ type: "none" }]
    };

    return game;
}
