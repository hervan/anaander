/*
------x-x-x------
      basic
------x-x-x------

meeple
    strength
    resistance
    faith
movement
swarm
tile
conversion
combat

abilities
    solo action
    fusion
    fission
    meeple improvement
    swarm reach
    swarm size

variations
    resource consumption/production
    special powers
    patterns
    artifacts
    exploration
    city conquest
    benefits from neighbours
    terrains
    meeple breeding
*/

/*
------x-x-x------
     complex
------x-x-x------

meeple
    strength
    faith
    resistance
    reach - how far it propagates actions, benefits and special powers
    influence - how strongly actions, benefits and special powers are carried onto neighbours

swarm
    size - constrained by resource production
    reach - defined by meeple attributes
    swarm benefits - defined by less than tetramino patterns
        triminos - I or L
        neighbour - adjacent or diagonal
        swarm size - if it makes sense for something that would benefit from collectivity
            faith
            technology
        echoes - cumulative benefits from neighbours
            combos? would combos yield special modifiers?

tile
    terrain
    terrain effects
    terrain-artifact affinity
    cities
    resource production of one kind

solo action
    a small number of actions guaranteed by some entity (cities?)
    further actions by stray meeples
        to compensate the benefit of extra actions
        implement a hindrance of making harder to feed
        no changes in combat because it's naturally harder for being alone

special powers
    fusion - combine stats
    fission - spread stats
    meeple breeding
    remote attack

resources
    food - for meeple attributes
    energy - for abilities
    a meeple exploring a terrain produces resources of the kind produced by the terrain
    meeple strength may make it produce more
    consider swarm benefits for better production

patterns
    tetraminos define artifact activation and should give the best special powers
    triminos should provide benefits to stimulate larger swarms, and should be inherent to larger swarms as well
    dominos/diagonals should provide the most basic needs
    swarm size should be used as a parameter for larger things, related to collectivity

artifacts
    work on activation
    work on possession
    maybe both, each giving a different benefit

exploration
    acquire artifacts
    produce resources
    improve city?

cities
    defense of n actions, the harder the better the benefits
    should be defeated by consecutive actions, an action by another player resets defenses
    or must be occupied by n meeples
    its owner may use this as form of locally giving a stronger defense
    give a permanent benefit to the player, like one extra action
    give benefits upon visiting by friendly player, like healing
    after conquest, explore improves city - like a stronger defense
*/

/*
------x-x-x------
     analysis
------x-x-x------

meeple      ok
terrain     ok
city
resource
artifact    ok
action      ok
power
*/

export enum Team {
    info,
    warning,
    success,
    danger,
    primary,
    default
}

export enum Action {
    up,
    left,
    down,
    right,
    hold,
    explore,
    skip
};

type Position = {
    row: number;
    col: number;
};

export enum Geography {
    swamp,
    island,
    mountain,
    forest,
    city,
    plains
}

type Item = {
    type:
    | "energy"
    | "food"
    | "ore"
    | "relic"
    | "technology";
    piece:
    | "i"
    | "l"
    | "o"
    | "s"
    | "t";
};

export const Items: Item[] = [
    { type: "energy", piece: "i" },
    { type: "food", piece: "l" },
    { type: "ore", piece: "o" },
    { type: "relic", piece: "s" },
    { type: "technology", piece: "t" }
];

export enum Turn {
    heads,
    tails
};

const turns: Turn[] = [ Turn.heads, Turn.tails ];

export enum Mode {
    tutorial,
    setup,
    play,
    end
};

export type Meeple = {
    key: number;
    position: Position;
    team: Team;
    turn: Turn;
    strength: number;
    resistance: number;
    faith: number;
    topsMeeple: number;
};

export type Terrain = {
    position: Position;
    geography: Geography;
    spaceLeft: number;
    topMeeple: number;
    items: boolean[];
};

export type Player = {
    team: Team;
    individualActions: number;
    swarmSize: number;
    items: boolean[];
};

export type Play = {
    mode: Mode;
    team: Team;
    from: Position | "player";
    action: Action | null;
};

interface IDictionary {
    [key: string]: string;
};

const InvalidPlays: IDictionary = {
    WrongTeam: "move a meeple of your own team.",
    WrongTurnHeads: "move a meeple with heads up.",
    WrongTurnTails: "move a meeple with tails up.",
    EmptyTerrain: "choose a terrain with a meeple in it.",
    NoGameYet: "wait for a game to begin.",
    OutOfBoard: "keep your meeples inside the board.",
    NotYourTurn: "wait for your turn to begin.",
    TerrainIsCrowded: "move to a terrain with space available.",
    NotOnGround: "only meeples on the ground can explore the terrain"
};

type InvalidPlay = {
    explanation: string;
};

export type Game = {
    boardSize: number;
    players: Player[];
    terrains: Terrain[];
    meeples: Meeple[];
    turn: Turn;
    currentPlayer: Team;
    mode: Mode;
    lastAction: Action | InvalidPlay;
};

export function logBoard(game: Game): void {

    const teamSymbol: IDictionary = {
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

function nextPlayer(game: Game): Team {

    let player: Team = game.currentPlayer;
    let i: number = game.players.length;

    do {
        player = (player + 1) % game.players.length;
    } while (game.players.length > 0 && game.players[player].swarmSize === 0 && i-- > 0);

    return player;
}

function flipTurn(turn: Turn): Turn {

    return (turns[(turns.indexOf(turn) + 1) % turns.length]);
}

function nextTurn(game: Game): Turn {

    return nextPlayer(game) <= game.currentPlayer ?
        flipTurn(game.turn) :
        game.turn;
}

function positionToIndex(position: Position, boardSize: number): number {

    return (position.row * boardSize + position.col);
}

export function meeplesBelow(game: Game, meepleIndex: number, acc: Meeple[]): Meeple[] {

    const meeple: Meeple = game.meeples[meepleIndex];

    if (meeple.topsMeeple !== -1) {

        return meeplesBelow(game, meeple.topsMeeple, [...acc, meeple]);

    } else {

        return [...acc, meeple];
    }
}

function moveMeeple(game: Game, from: Position, action: Action): Game {

    const gameMeeples: Meeple[] = game.meeples.slice();
    const gameTerrains: Terrain[] = game.terrains.slice();
    const gamePlayers: Player[] = game.players.slice();

    const terrainFrom: Terrain = gameTerrains[positionToIndex(from, game.boardSize)];

    const topMeeple: number = terrainFrom.topMeeple;

    let lastAction: Action | InvalidPlay | null = null;

    let to: Position = {
        row: from.row,
        col: from.col
    };

    if (topMeeple === -1) {

        lastAction = { explanation: InvalidPlays.EmptyTerrain };

    } else if ((gameMeeples[topMeeple].team as Team) !== game.currentPlayer) {

        lastAction = { explanation: InvalidPlays.WrongTeam };

    } else if (gameMeeples[topMeeple].turn !== game.turn) {

        lastAction = { explanation:
            (game.turn === turns[0] ?
                InvalidPlays.WrongTurnHeads :
                InvalidPlays.WrongTurnTails) };

    } else {

        switch (action) {

            case Action.left:
            to.col = from.col - 1;
            break;

            case Action.right:
            to.col = from.col + 1;
            break;

            case Action.up:
            to.row = from.row - 1;
            break;

            case Action.down:
            to.row = from.row + 1;
            break;

            case Action.explore:
            lastAction =
                gameMeeples[topMeeple].topsMeeple === -1 ?
                null :
                { explanation: InvalidPlays.NotOnGround };
            break;

            default:
            lastAction = null;
        }

        if (to.row < 0
          || to.row >= game.boardSize
          || to.col < 0
          || to.col >= game.boardSize) {

            lastAction = { explanation: InvalidPlays.OutOfBoard };

        } else {

            const terrainTo: Terrain = gameTerrains[positionToIndex(to, game.boardSize)];

            if (terrainTo.spaceLeft <= 0
                && terrainTo.topMeeple !== terrainFrom.topMeeple) {

                lastAction = { explanation: InvalidPlays.TerrainIsCrowded };
            }

            if (lastAction === null) {

                const meeple: Meeple = gameMeeples[topMeeple];

                meeple.turn = flipTurn(meeple.turn);

                lastAction = action;

                switch (action) {

                    case Action.explore:

                    terrainTo.items.forEach((item, index) => {

                        if (item && !gamePlayers[gameMeeples[meeple.key].team].items[index]) {

                            terrainTo.items[index] = false;
                            gamePlayers[gameMeeples[meeple.key].team].items[index] = true;
                        }
                    });

                    gameTerrains[positionToIndex(to, game.boardSize)] = terrainTo;

                    break;

                    case Action.up:
                    case Action.left:
                    case Action.down:
                    case Action.right:

                    terrainFrom.topMeeple = meeple.topsMeeple;
                    terrainFrom.spaceLeft++;
                    meeple.topsMeeple = terrainTo.topMeeple;
                    terrainTo.topMeeple = meeple.key;
                    terrainTo.spaceLeft--;

                    meeple.position = to;

                    gameMeeples[meeple.key] = meeple;

                    if (meeple.topsMeeple !== -1
                        && gameMeeples[meeple.key].team !== gameMeeples[meeple.topsMeeple].team) {

                        const meepleOver: Meeple = gameMeeples[meeple.key];
                        const meepleUnder: Meeple = gameMeeples[meeple.topsMeeple];

                        if (meepleOver.faith > meepleUnder.faith + meepleUnder.strength) {

                            if (meepleUnder.team < gamePlayers.length) {

                                gamePlayers[meepleUnder.team].swarmSize--;
                            }

                            meepleUnder.team = meepleOver.team;
                            gamePlayers[meepleOver.team].swarmSize++;
                            meepleOver.resistance += meepleUnder.resistance;

                        } else {

                            meepleUnder.resistance -= meepleOver.strength;
                            meepleOver.resistance -= meepleUnder.strength;

                            if (meepleUnder.resistance <= 0) {

                                meepleUnder.key = -1;
                                meepleOver.topsMeeple = meepleUnder.topsMeeple;
                                meepleOver.faith += meepleUnder.faith;
                                terrainTo.spaceLeft++;

                                if (meepleUnder.team < gamePlayers.length) {

                                    gamePlayers[meepleUnder.team].swarmSize--;
                                }
                            }

                            if (meepleOver.resistance <= 0) {

                                meepleOver.key = -1;
                                terrainTo.topMeeple = meepleOver.topsMeeple;
                                meepleUnder.faith += meepleOver.faith;
                                terrainTo.spaceLeft++;

                                gamePlayers[meepleOver.team].swarmSize--;
                            }
                        }

                    }

                    gameTerrains[positionToIndex(from, game.boardSize)] = terrainFrom;
                    gameTerrains[positionToIndex(to, game.boardSize)] = terrainTo;

                    break;
                }
            }
        }
    }

    return {

        boardSize: game.boardSize,
        players: gamePlayers.slice(),
        terrains: gameTerrains.slice(),
        meeples: gameMeeples.slice(),
        turn: game.turn,
        currentPlayer: game.currentPlayer,
        mode: game.mode,
        lastAction: lastAction
    };
}

function moveSwarm(game: Game, action: Action): Game {

    const availablePlayerMeeples: number[] =
        game.terrains.map((terrain) => terrain.topMeeple)
            .filter((topMeeple) =>
                topMeeple !== -1 &&
                game.meeples[topMeeple].team === game.currentPlayer &&
                game.meeples[topMeeple].turn === game.turn);

    return (action === Action.right || action === Action.down ?
        availablePlayerMeeples.reverse() :
        availablePlayerMeeples)
        .map((meepleIndex) => game.meeples[meepleIndex])
        .reduce((acc, meeple) => moveMeeple(acc, meeple.position, action), game);
}

export function play(game: Game, play: Play): Game {

    if (play.mode === Mode.setup) {

        return {

            boardSize: game.boardSize,
            players: game.players.slice(),
            terrains: game.terrains.slice(),
            meeples: game.meeples.slice(),
            turn: game.turn,
            currentPlayer: game.currentPlayer,
            mode: game.mode,
            lastAction: { explanation: InvalidPlays.NoGameYet }
        };
    } else if (game.currentPlayer !== play.team) {

        return {

            boardSize: game.boardSize,
            players: game.players.slice(),
            terrains: game.terrains.slice(),
            meeples: game.meeples.slice(),
            turn: game.turn,
            currentPlayer: game.currentPlayer,
            mode: game.mode,
            lastAction: { explanation: InvalidPlays.NotYourTurn }
        };
    }

    switch (play.team) {

        case Team.default:

        return {

            boardSize: game.boardSize,
            players: game.players.slice(),
            terrains: game.terrains.slice(),
            meeples: game.meeples.slice(),
            turn: game.turn,
            currentPlayer: 0,
            mode: play.mode,
            lastAction: Action.skip
        };

        default:

        let gameStep: Game;
        let player: Team;
        let turn: Turn;

        switch (play.from) {

            case "player":

            gameStep = moveSwarm(game, play.action as Action);
            player = nextPlayer(gameStep);
            turn = nextTurn(gameStep);

            break;

            default:

            gameStep = moveMeeple(game, play.from as Position, play.action as Action);
            player = nextPlayer(gameStep);
            turn = gameStep.turn;

            break;
        }

        let mode: Mode = gameStep.mode;

        if (mode !== Mode.tutorial) {

            if (gameStep.players.filter((aPlayer) => aPlayer.swarmSize > 0).length < 2) {

                mode = Mode.end;
            }
        }

        return {

            boardSize: gameStep.boardSize,
            players: gameStep.players.slice(),
            terrains: gameStep.terrains.slice(),
            meeples: gameStep.meeples.slice(),
            turn: turn,
            currentPlayer: player,
            mode: mode,
            lastAction: gameStep.lastAction
        };
    }
}

function playSwarm(game: Game, from: Position, action: Action): Game {

    return game;
}

export function newPlay(game: Game, play: Play): Game {

    if (play.mode === Mode.setup) {

        return {
            ...game,
            lastAction: { explanation: InvalidPlays.NoGameYet }
        };
    } else if (game.currentPlayer !== play.team) {

        return {
            ...game,
            lastAction: { explanation: InvalidPlays.NotYourTurn }
        };
    }

    switch (play.from) {

        case "player":

        return {
            ...game,
            currentPlayer: 0,
            mode: play.mode,
            lastAction: Action.skip
        };

        default:

        return updateGameState(playSwarm(game, play.from, play.action!));
    }
}

function updateGameState(game: Game): Game {

    let currentPlayer = game.currentPlayer;
    let turn = game.turn;
    let mode = game.mode;

    currentPlayer = nextPlayer(game);
    turn = nextTurn(game);

    if (mode !== Mode.tutorial) {

        if (game.players.filter((player) => player.swarmSize > 0).length < 2) {

            mode = Mode.end;
        }
    }

    return {
        ...game,
        turn: turn,
        currentPlayer: currentPlayer,
        mode: mode
    };
}

export function setup(playerCount: number = 0, boardSize: number = 16): Game {

    let meepleKey: number = playerCount;

    const terrains: Terrain[] = new Array<Terrain>();
    const meeples: Meeple[] = new Array<Meeple>();

    for (let i: number = 0; i < boardSize; i++) {

        for (let j: number = 0; j < boardSize; j++) {

            const position: Position = {
                row: i,
                col: j
            };

            const geography: Geography = Math.floor((Math.sqrt(8 * (Math.floor(Math.random() * 21) + 1)) - 1) / 2);

            let topMeeple: number = -1;
            let spaceLeft: number = geography + 1;

            if (spaceLeft > 1
                && Math.random() < 0.12) {

                const meeple: Meeple = {

                    key: meepleKey++,
                    position: position,
                    team: Team.default,
                    turn: turns[0],
                    strength: Math.ceil(Math.random() * 5),
                    resistance: Math.ceil(Math.random() * 15),
                    faith: Math.ceil(Math.random() * 15),
                    topsMeeple: -1
                };

                topMeeple = meeple.key;
                spaceLeft--;
                meeples[meeple.key] = meeple;
            }

            terrains[positionToIndex(position, boardSize)] = {

                position: position,
                geography: geography,
                spaceLeft: spaceLeft,
                topMeeple: topMeeple,
                items: Items.map((item, index) => index === geography && Math.random() < (1 / 6))
            };
        }
    }

    const players: Player[] = new Array<Player>();
    let i: number = 0;
    meepleKey = 0;

    for (let team = 0; team < playerCount; team++) {

        let position: Position;

        do {

            position = {

                row: Math.floor(Math.random() * (boardSize - 2)) + 1,
                col: Math.floor(Math.random() * (boardSize - 2)) + 1
            };

        } while (terrains[positionToIndex(position, boardSize)].topMeeple > -1);

        const meeple: Meeple = {
            key: meepleKey++,
            position: position,
            team: team,
            turn: turns[0],
            strength: 10 + Math.ceil(Math.random() * 5),
            resistance: 20 + Math.ceil(Math.random() * 10),
            faith: 20 + Math.ceil(Math.random() * 10),
            topsMeeple: -1
        };

        terrains[positionToIndex(position, boardSize)].topMeeple = meeple.key;
        terrains[positionToIndex(position, boardSize)].spaceLeft--;
        meeples[meeple.key] = meeple;

        players[team] = {
            team: team,
            individualActions: 0,
            swarmSize: 1,
            items: Items.map(() => false)
        };
    }

    const game: Game = {

        boardSize: boardSize,
        players: players,
        terrains: terrains,
        meeples: meeples.slice(),
        turn: turns[0],
        currentPlayer: Team.default,
        mode: Mode.setup,
        lastAction: { explanation: InvalidPlays.None }
    };

    return game;
}

function t(row: number, col: number, topMeeple: number = -1): Terrain {

    const geography: Geography = (row + col) % 6 + 1;

    return {
        position: { row: row, col: col },
        geography: geography,
        spaceLeft: geography,
        topMeeple: topMeeple,
        items: []
    };
}

export function tutorial(index: number): Game {

    const tutorialStepsScenarios: Game[] = [
        // tutorial start
        play(setup(5), {
            mode: Mode.tutorial,
            team: Team.default,
            from: "player",
            action: null
        }),
        { // the board
            boardSize: 16,
            players: [],
            terrains: [...Array(16).keys()].reduce((acc, row) =>
                acc.concat([...Array(16).keys()].map((col) => t(row, col))), [] as Terrain[]),
            meeples: [],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
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
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                }
            ],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
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
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 1, col: 1 },
                    team: Team.warning,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 2,
                    position: { row: 2, col: 2 },
                    team: Team.success,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 3,
                    position: { row: 3, col: 3 },
                    team: Team.danger,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 4,
                    position: { row: 4, col: 4 },
                    team: Team.primary,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 5,
                    position: { row: 5, col: 5 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
            ],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
        },
        { // the moves
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 1,
                    items: []
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
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
            ],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
        },
        { // moving over meeples
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 1,
                    items: []
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
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
            ],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
        },
        { // converting a meeple
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 1,
                    items: []
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
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
            ],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
        },
        { // battling meeples
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 1,
                    items: []
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
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 20,
                    faith: 20,
                    topsMeeple: -1
                },
            ],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
        },
        { // dying meeple
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 1,
                    items: []
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
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 10,
                    faith: 20,
                    topsMeeple: -1
                },
            ],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
        },
        { // the swarm
            boardSize: 6,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 5,
                    items: []
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
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 2, col: 3 },
                    team: Team.info,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 2,
                    position: { row: 3, col: 3 },
                    team: Team.info,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 3,
                    position: { row: 3, col: 2 },
                    team: Team.info,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 4,
                    position: { row: 3, col: 1 },
                    team: Team.info,
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 5,
                    position: { row: 0, col: 4 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 6,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                }
            ],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
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
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 3, col: 6 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 2,
                    position: { row: 4, col: 6 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 3,
                    position: { row: 5, col: 6 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 4,
                    position: { row: 6, col: 6 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 5,
                    position: { row: 1, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 6,
                    position: { row: 2, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 7,
                    position: { row: 3, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 8,
                    position: { row: 4, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 9,
                    position: { row: 5, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 10,
                    position: { row: 6, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 11,
                    position: { row: 3, col: 2 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 12,
                    position: { row: 3, col: 3 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 13,
                    position: { row: 4, col: 4 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 14,
                    position: { row: 5, col: 4 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 15,
                    position: { row: 6, col: 4 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
            ],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
        },
        { // the conflicts
            boardSize: 6,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 2,
                    items: []
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
                    turn: Turn.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 1,
                    position: { row: 2, col: 2 },
                    team: Team.warning,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 10,
                    faith: 30,
                    topsMeeple: -1
                },
                {
                    key: 2,
                    position: { row: 3, col: 3 },
                    team: Team.success,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                },
                {
                    key: 3,
                    position: { row: 4, col: 1 },
                    team: Team.default,
                    turn: Turn.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
                    topsMeeple: -1
                }
            ],
            turn: Turn.heads,
            currentPlayer: Team.info,
            mode: Mode.tutorial,
            lastAction: Action.skip
        }
    ];

    return tutorialStepsScenarios[index];
}
