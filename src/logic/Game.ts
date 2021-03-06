import Card from "./Card";

import {cards, decks, initialHand} from "./Card";
import {
    BuildingPhase,
    Buildings,
    City,
    Construction,
    EmptySite,
    Piece,
    pieceShapes
} from "./Construction";
import {Meeple, Phase} from "./Meeple";
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
    card,
    hold
};

export type Play = {
    readonly team: Team;
    readonly selection: number[];
} & ({
    readonly action:
    | Action.explore | Action.hold
    | Action.up | Action.left
    | Action.down | Action.right;
} | {
    readonly action: Action.card;
    readonly cardKey: number;
});

const InvalidPlays: { [key: string]: string } = {
    MeepleNotAvailable: "choose a meeple of your own team and with the current phase on.",
    OutOfBoard: "keep your meeples inside the board.",
    NotYourTurn: "wait for your turn to begin.",
    TerrainIsCrowded: "move to a terrain with space available.",
    NotOnGround: "only meeples on the ground can explore the terrain.",
    NoSelection: "please select meeples before choosing the action.",
    NotYourCard: "you must play a card from your hand.",
    NoValidTarget: "you must choose a meeple with a valid target.",
    NotEnoughResources: "you need more resources to activate this card.",
    NoPreviousCard: "you must play a card before reactivating it.",
    NotYourBuilding: "you must own a building to activate it."
};

type Turn = {
    readonly round: number;
    readonly team: Team;
    readonly phase: Phase;
};

export type Outcome = ({
    readonly team: Team
    readonly type:
        | "action"
        | "harvest" | "construction"
        | "building" | "pattern"
        | "invalid" | "gameover",
    readonly detail: string
});

export type Game = {
    readonly boardSize: number;
    readonly players: Player[];
    readonly terrains: Terrain[];
    readonly meeples: Meeple[];
    readonly decks: number[][];
    readonly discardPiles: number[][];
    readonly lastCard?: {
        readonly key: number;
        readonly targets: number[];
        readonly cost: number[];
    }
    readonly turn: Turn;
    readonly outcome: Outcome[];
};

function switchPhase(phase: Phase): Phase {

    return (phase + 1) % 2;
}

function rotateTeam(turn: Turn, playerCount: number): Team {

    return playerCount < 1 ?
        turn.team :
        (turn.team + 1) % playerCount;
}

function nextTurn(game: Game): Game {

    const { round, phase } = game.turn;
    let team = game.turn.team;

    const availableTeams = game.players
        .filter((player) => availableMeeples(game, player.team).length > 0)
        .map((player) => player.team);

    if (availableTeams.length === 0) {
        // no more actions left this round
        return nextTurn({
            ...game,
            turn: {
                round: round + 1,
                team: -1,
                phase: switchPhase(phase)
            }
        });
    }

    while (!availableTeams.some((t) => t === team)) {

        team = rotateTeam({
            round: round,
            team: team,
            phase: phase
        }, game.players.length);
    }

    return {
        ...game,
        turn: {
            round: round,
            team: team,
            phase: phase
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
    const topMeeple = terrain.topMeeple;
    const meeple = game.meeples[topMeeple];

    return topMeeple !== -1
        && meeple.key !== -1
        && meeple.team === team
        && meeple.phase === game.turn.phase;
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
                team: game.turn.team,
                type: "invalid",
                detail: InvalidPlays.NotYourTurn
            }]
        };
    } else if (play.selection.length === 0) {

        return {
            ...game,
            outcome: [{
                team: game.turn.team,
                type: "invalid",
                detail: InvalidPlays.NoSelection
            }]
        };
    } else {

        const swarm = selectSwarm(game, game.meeples[play.selection[0]].position);

        if (play.selection
            .some((meepleKey) => !swarm.some((swarmKey) => swarmKey === meepleKey))) {

            return {
                ...game,
                outcome: [{
                    team: game.turn.team,
                    type: "invalid",
                    detail: InvalidPlays.NoSelection
                }]
            };
        }
    }

    const gameStep =
        play.action === Action.card ?
        playCard(game, play.cardKey, play.selection) :
        playSwarm(game, play.action, play.selection);

    if (isOver(gameStep)) {

        return {
            ...gameStep,
            outcome: [{
                team: game.turn.team,
                type: "gameover",
                detail: "won"
            }]
        };
    }

    const gameTurn = nextTurn(gameStep);

    return {
        ...gameTurn,
        outcome: [{
            team: game.turn.team,
            type: "action",
            detail: Action[play.action]
        }]
    };
}

export function playerSwarm(game: Game, team: Team = game.turn.team) {

    return game.meeples
        .filter((meeple) => meeple.key !== -1 && meeple.team === team)
        .map((meeple) => ({
            meeple: meeple,
            terrain: game.terrains[positionToIndex(meeple.position, game.boardSize)]
        }))
        .sort((a, b) => a.terrain.key - b.terrain.key);
}

export function playerProduction(game: Game, team: Team = game.turn.team) {

    return playerSwarm(game, team)
        .filter(({meeple, terrain}) => meeple.key === terrain.topMeeple)
        .reduce((acc, {meeple, terrain}) => terrain.construction.production
            .map((amount, index) => acc[index] + (meeple.phase === game.turn.phase ? amount : 0)),
            [0, 0, 0, 0, 0]);
}

function playCard(game: Game, cardKey: number, selection: number[]): Game {

    const hand = game.players[game.turn.team].hand;

    if (hand.find((card) => card.key === cardKey) === undefined) {

        return {
            ...game,
            outcome: [...game.outcome, {
                team: game.turn.team,
                type: "invalid",
                detail: InvalidPlays.NotYourCard
            }]
        };
    }

    const card = {...cards[cardKey]};

    const targets = card.target(game, game.meeples[selection[0]].position);
    if (targets.length === 0) {

        return {
            ...game,
            outcome: [...game.outcome, {
                team: game.turn.team,
                type: "invalid",
                detail: InvalidPlays.NoValidTarget
            }]
        };
    }

    const cost = card.cost.map((amount) =>
        game.turn.round > card.acquisitionRound ?
        targets.length * amount : 0);

    if (cost.some((amount, i) => amount > playerProduction(game)[i])) {

        return {
            ...game,
            outcome: [...game.outcome, {
                team: game.turn.team,
                type: "invalid",
                detail: InvalidPlays.NotEnoughResources
            }]
        };
    }

    const gameStep = card.apply(game, card.effect, targets);

    return {
        ...gameStep,
        players: gameStep.players.map(
            (player) => player.team === gameStep.turn.team ?
            {
                ...player,
                resources: playerProduction(gameStep).map((amount, i) => amount - cost[i]),
                hand: hand.filter((c) => c.key !== card.key)
            } : {...player}
        ),
        meeples: gameStep.meeples.map(
            (meeple) => meeple.key === selection[0] ?
            {
                ...meeple,
                phase: switchPhase(meeple.phase)
            } : {...meeple}
        ),
        discardPiles: gameStep.discardPiles.map(
            (pile, i) => i === card.pattern ?
            [
                ...pile.slice(),
                card.key
            ] : pile.slice()
        ),
        lastCard: {
            key: card.key,
            targets: targets,
            cost: [
                ...[...Array(4).keys()].map((o) => 0),
                cost.reduce((acc, amount) => acc + amount, 0)
            ]
        }
    };
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
                    phase: switchPhase(terrain.construction.phase)
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

        const patternDiscard = game.discardPiles[piece].slice();
        const patternDeck: number[] =
            game.decks[piece].length > 0 ?
            game.decks[piece].slice() :
            patternDiscard.splice(0, patternDiscard.length).slice();

        if (patternDeck.length > 0) {

            const card = {...cards[patternDeck.splice(Math.floor(Math.random() * patternDeck.length), 1)[0]]};

            const hand = player.hand.slice();
            hand.push({
                key: card.key,
                acquisitionRound: game.turn.round
            });

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
                        phase: switchPhase(meeple.phase)
                    } : {...m}
                ),
                decks: game.decks.map((deck, i) =>
                    i === piece ?
                    patternDeck.slice() :
                    deck.slice()
                ),
                discardPiles: game.discardPiles.map((discard, i) =>
                    i === piece ?
                    patternDiscard.slice() :
                    discard.slice()
                ),
                outcome: [...game.outcome, {
                    team: game.turn.team,
                    type: "pattern",
                    detail: Piece[piece]
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
    const shapeOnMap = patternMatch(game, position, shape.slice())
        .filter((pos) => game.terrains[positionToIndex(pos, game.boardSize)].geography === Geography.sprawl);

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
                        type: "building" as "building",
                        team: game.turn.team,
                        blueprint: Piece[piece],
                        name: Buildings[Piece[piece]],
                        phase: Phase.high,
                        production: [...Array(5).keys()].map((o, i) => i === Resource.cubit ? 1 : 0)
                    }
                }) : t
            ),
            meeples: game.meeples.map((m) =>
                shapeOnMap.some((p) =>
                    m.key === game.terrains[positionToIndex(p, game.boardSize)].topMeeple) ?
                {
                    ...m,
                    phase: switchPhase(meeple.phase)
                } : {...m}
            ),
            outcome: [...game.outcome, {
                team: game.turn.team,
                type: "construction",
                detail: Buildings[Piece[piece]]
            }]
        };
    }

    return {...game};
}

function exploreTerrain(game: Game, position: Position): Game {

    if (teamControls(game, position)) {

        const construction = game.terrains[positionToIndex(position, game.boardSize)].construction;

        const exploredGame: Game =
            (construction.type === "emptysite") ?
            {
                ...game,
                terrains: game.terrains.map(
                    (terrain, i) => i === positionToIndex(position, game.boardSize) ?
                    {
                        ...terrain,
                        construction: {
                            ...construction,
                            phase: switchPhase(construction.phase)
                        }
                    } : terrain
                )
            } : (construction.type === "building") ?
            activateBuilding(game, position) :
            {...game};

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
                    team: game.turn.team,
                    type: "action",
                    detail: Action[Action.explore]
                }
            ]
        };
    } else {

        return {
            ...game,
            outcome: [...game.outcome, {
                team: game.turn.team,
                type: "invalid",
                detail: InvalidPlays.NotOnGround
            }]
        };
    }
}

function convertMeeple(game: Game, meepleOver: Meeple, meepleUnder: Meeple): Game {

    const gamePlayers = game.players.slice();
    const gameMeeples = game.meeples.slice();

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

    const city = terrain.construction;
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
                .map((phase, i) => i === terrain.geography - 1 && phase === "notbuilt" ? "blueprint" : phase)
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
            players: players.map((player) =>
                player.team === meeple.team ?
                {
                    ...player,
                    buildingPhase: player.buildingPhase.map((phase, index) =>
                        index === Piece.i && phase === "notbuilt" ?
                        (player.buildingPhase.every((bp, i) =>
                            i === Piece.i || bp !== "notbuilt") ?
                            "blueprint" : phase
                        ) : phase
                    )
                } : {...player}
            )
        };
    }

    return game;
}

function activateBuilding(game: Game, position: Position): Game {

    const terrain: Terrain = game.terrains[positionToIndex(position, game.boardSize)];
    const meeple: Meeple = game.meeples[terrain.topMeeple];
    const construction: Construction = terrain.construction;

    if (construction.type === "building") {

        if (construction.team !== meeple.team) {

            return {
                ...game,
                outcome: [...game.outcome, {
                    team: game.turn.team,
                    type: "invalid",
                    detail: InvalidPlays.NotYourBuilding
                }]
            };
        }

        switch (construction.blueprint) {

            case "i":

            if (game.lastCard === undefined) {

                return {
                    ...game,
                    outcome: [...game.outcome, {
                        team: game.turn.team,
                        type: "invalid",
                        detail: InvalidPlays.NoPreviousCard
                    }]
                };
            }

            const {key, targets, cost} = game.lastCard;
            const card = {...cards[key]};

            if (cost.some((amount, i) => amount > terrain.construction.production[i])) {

                return {
                    ...game,
                    outcome: [...game.outcome, {
                        team: game.turn.team,
                        type: "invalid",
                        detail: InvalidPlays.NotEnoughResources
                    }]
                };
            }

            const gameStep = card.apply(game, card.effect, targets);
            return {
                ...gameStep,
                meeples: gameStep.meeples.map(
                    (m) => m.key === meeple.key ?
                    {
                        ...m,
                        phase: switchPhase(m.phase)
                    } : {...m}
                ),
                lastCard: undefined
            };

            case "l":

            return {
                ...game,
                meeples: game.meeples.map((m) =>
                    m.key === meeple.key ?
                    {
                        ...meeple,
                        faith: meeple.faith + construction.production[Resource.cubit],
                        phase: switchPhase(meeple.phase)
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
                        strength: meeple.strength + construction.production[Resource.cubit],
                        phase: switchPhase(meeple.phase)
                    } : m
                )
            };

            case "s":

            if (meeple.topsMeeple !== -1
                && game.meeples[meeple.topsMeeple].team === meeple.team) {

                const meepleUnder = game.meeples[meeple.topsMeeple];
                return {
                    ...game,
                    terrains: game.terrains.map((t) =>
                        t.position.row === terrain.position.row && t.position.col === terrain.position.col ?
                        {
                            ...t,
                            spaceLeft: terrain.spaceLeft + 1
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
                                topsMeeple: meepleUnder.topsMeeple,
                                phase: switchPhase(meeple.phase)
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

            case "t":

            return {
                ...game,
                meeples: game.meeples.map((m) =>
                    m.key === meeple.key ?
                    {
                        ...meeple,
                        resistance: meeple.resistance + construction.production[Resource.cubit],
                        phase: switchPhase(meeple.phase)
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
                        team: game.turn.team,
                        type: "invalid",
                        detail: InvalidPlays.OutOfBoard
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
                        team: game.turn.team,
                        type: "invalid",
                        detail: InvalidPlays.TerrainIsCrowded
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
        phase: switchPhase(meeple.phase)
    };

    const gameMeeples = game.meeples.slice();

    const topMeepleFrom = meeple.topsMeeple;
    const constructionFrom: Construction = terrainFrom.construction;

    if (topMeepleFrom !== -1) {

        const freedMeeple = gameMeeples[terrainFrom.topMeeple];

        if (freedMeeple.team < game.players.length) {

            gameMeeples[terrainFrom.topMeeple] = {
                ...freedMeeple,
                phase: freedMeeple.team > meeple.team ? game.turn.phase : meeple.phase
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
            team: game.turn.team,
            type: "action",
            detail: Action[action]
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
                team: game.turn.team,
                type: "invalid",
                detail: InvalidPlays.MeepleNotAvailable
            }]
        };
    }

    const meeple = game.meeples[meepleIndex];

    if (!isMeepleAvailable(game, meeple.position)) {

        return {
            ...game,
            outcome: [...game.outcome, {
                team: game.turn.team,
                type: "invalid",
                detail: InvalidPlays.MeepleNotAvailable
            }]
        };
    }

    const gameMeeples = game.meeples.slice();

    switch (action) {

        case Action.explore:

        return exploreTerrain(game, meeple.position);

        case Action.up:
        case Action.left:
        case Action.down:
        case Action.right:

        return moveMeeple(game, action, meeple);

        case Action.hold:
        default:

        gameMeeples[meepleIndex] = {
            ...meeple,
            phase: switchPhase(meeple.phase)
        };

        return {
            ...game,
            meeples: gameMeeples,
            outcome: [...game.outcome, {
                team: game.turn.team,
                type: "action",
                detail: Action[action]
            }]
        };
    }
}

export function begin(game: Game): Game {

    return {
        ...game,
        turn: {
            round: 1,
            phase: Phase.high,
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

export function terrainPatch(
    game: Game,
    position: Position,
    continent: boolean = false,
    patch: Position[] = []): Position[] {

    const newTerrain = game.terrains[positionToIndex(position, game.boardSize)];

    if (newTerrain.geography < (continent ? 1 : 2)
        || patch.some((t) => positionToIndex(t, game.boardSize) === newTerrain.key)) {

        return patch;
    }

    return adjacent(position, game.boardSize)
        .reduce((acc, pos) => terrainPatch(game, pos, continent, acc), [...patch, position]);
}

export function setup(humanPlayerCount: number, computarPlayerCount: number, boardSize: number = 20): Game {

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
    const patchesPerDimension = Math.ceil(Math.sqrt(4 * (humanPlayerCount + computarPlayerCount)));
    const patchLength = boardSize / patchesPerDimension;
    const defaultPatchArea = ((patchLength - 1) / 2) ** 2;

    const patchSeeds: Position[] =
        [...Array(patchesPerDimension ** 2).keys()].map((i) =>
            ({
                row: Math.round((patchLength / 2) + (patchLength * Math.floor(i / patchesPerDimension))),
                col: Math.round((patchLength / 2) + (patchLength * (i % patchesPerDimension)))
            })
        );

    const requiredGeography = [...Array(4 * (humanPlayerCount + computarPlayerCount)).keys()].map((i) => (i % 4) + 2);

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
                Math.ceil(Math.random() * 4) + 1;
            const boundaries: Position[] = [];

            patch.forEach((position) => {

                let spaceLeft = geographyIndex;
                let construction: Construction = {
                    type: "emptysite",
                    phase: Phase.high,
                    production: [...Array(5).keys()]
                        .map((o, i) => GeographyInfo[geographyIndex].resources
                            .some((resource) => resource === i) ? 1 : 0)
                };

                if (position.row === cityPosition.row
                    && position.col === cityPosition.col) {

                    spaceLeft--;
                    construction = {
                        type: "city",
                        key: positionToIndex(position, boardSize),
                        name: cityNames.splice(Math.floor(Math.random() * cityNames.length), 1)[0],
                        defense: 5 + Math.ceil(Math.random() * 20),
                        team: Team.default,
                        phase: Phase.high,
                        production: [...Array(5).keys()].map((o) => 0)
                    };
                }

                terrains[positionToIndex(position, boardSize)] = {
                    key: positionToIndex(position, boardSize),
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
                    key: positionToIndex(position, boardSize),
                    geography: Geography.desert,
                    position: position,
                    spaceLeft: 1,
                    topMeeple: -1,
                    construction: {
                        type: "emptysite",
                        phase: Phase.high,
                        production: [...Array(5).keys()]
                            .map((o, i) => GeographyInfo[Geography.desert].resources
                                .some((resource) => resource === i) ? 1 : 0)
                    }
                };
            });
        }

        patchIndex++;
    }

    let meepleKey: number = (humanPlayerCount + computarPlayerCount);
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
                    key: positionToIndex(position, boardSize),
                    geography: emptyTerrainGeoIndex,
                    position: position,
                    spaceLeft: 1,
                    topMeeple: -1,
                    construction: {
                        type: "emptysite",
                        phase: Phase.high,
                        production: [...Array(5).keys()]
                            .map((o, index) => GeographyInfo[emptyTerrainGeoIndex].resources
                                .some((resource) => resource === index) ? 1 : 0)
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
                    phase: Phase.high,
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
    const i: number = 0;
    meepleKey = 0;

    for (let team = Team.info; team < (humanPlayerCount + computarPlayerCount); team++) {

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
            phase: Phase.high,
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
            controller: team < humanPlayerCount ? "human" : "computer",
            team: team,
            cities: [],
            swarmSize: meeples.filter((m) => m.team === team).length,
            buildingPhase: [...Array(5).keys()].map((o) => "notbuilt" as BuildingPhase),
            hand: initialHand(team),
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
            phase: Phase.off
        },
        outcome: []
    };

    return game;
}
