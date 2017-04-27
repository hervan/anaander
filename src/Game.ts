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
    profiles - stats will follow a curve better suited for a specific role

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
            with reach gone, it's the only place where reach still makes sense (maybe a building improves reach)
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
    tetraminos are blueprints for buildings (found upon exploration)
    the player position the meeples, pay resources and place the buildinds
    the buildings give the benefits upon visiting, or maybe just for existing (for permanent benefits)
    exploration still makes sense? patterns will become harder if they are buildings, requiring:
        spending an action
        spending resources
        moving to the location
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
    one meeple from your team can enter a city you own, and only one.
    no one else can enter it, so that meeple is protected (like a garrison).
    your meeples can enter a city you don't own to conquer it, but they'll leave only after finishing the conquest.
    the conquest is over when their total stregth is greater than the city's defense, or you moved four meeples there.
    while the conquest is not over, the city owner (and only him) can enter the city and battle the top meeple.
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
};

export enum Action {
    up,
    left,
    down,
    right,
    hold,
    explore,
    skip
};

export enum Geography {
    desert,
    swamp,
    mountain,
    forest,
    valley,
    plains
};

export enum Item {
    energy,
    food,
    ore,
    relic,
    technology
};

export const GeographyItem = [
    { type: "desert", item: null, piece: null },
    { type: "swamp", item: Item.energy, piece: "i" },
    { type: "mountain", item: Item.food, piece: "l" },
    { type: "forest", item: Item.ore, piece: "o" },
    { type: "valley", item: Item.relic, piece: "s" },
    { type: "plains", item: Item.technology, piece: "t" }
];

export enum Side {
    heads,
    tails,
    none
};

export type Position = {
    row: number;
    col: number;
};

export type Meeple = {
    key: number;
    position: Position;
    team: Team;
    side: Side;
    strength: number;
    resistance: number;
    faith: number;
    topsMeeple: number;
};

export type City = {
    name: string;
    resistance: number;
};

export type Terrain = {
    position: Position;
    geography: Geography;
    spaceLeft: number;
    topMeeple: number;
    item: boolean;
    city?: City;
};

export type Player = {
    team: Team;
    individualActions: number;
    swarmSize: number;
    items: boolean[];
};

export type PlayType =
| "skip"
| "swarm"
| "pattern"
| "individual";

export type Play = {
    team: Team;
    play: {
        type: "individual";
        action: Action;
        meepleIndex: number;
    } | {
        type: "pattern";
        pattern: number[];
        meepleIndex: number;
    } | {
        type: "swarm";
        action: Action;
        swarm: number[];
    } | {
        type: "skip";
        action: Action.skip;
    }
};

const InvalidPlays: { [key: string]: string } = {
    WrongTeam: "move a meeple of your own team.",
    WrongSideHeads: "move a meeple with heads up.",
    WrongSideTails: "move a meeple with tails up.",
    EmptyTerrain: "choose a terrain with a meeple in it.",
    OutOfBoard: "keep your meeples inside the board.",
    NotYourTurn: "wait for your turn to begin.",
    TerrainIsCrowded: "move to a terrain with space available.",
    NotOnGround: "only meeples on the ground can explore the terrain",
    NoSelection: "please select meeples before choosing the action",
    NoExtraActions: "the amount of extra actions per turn is equal to the amount of cities you control",
    NoSwarm: "you must play a whole swarm, or spend extra actions"
};

type InvalidPlay = {
    explanation: string;
};

type Turn = {
    count: number;
    team: Team;
    side: Side;
};

export type Game = {
    boardSize: number;
    players: Player[];
    terrains: Terrain[];
    meeples: Meeple[];
    turn: Turn;
    skips: number;
    lastAction: Action | InvalidPlay;
};

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

function rotateTeam(game: Game): Team {

    let team: Team = game.turn.team;
    let i: number = game.players.length;

    do {
        team = (team + 1) % game.players.length;
    } while (game.players.length > 0 && game.players[team].swarmSize === 0 && i-- > 0);

    return team;
}

function flipSide(side: Side): Side {

    return (side + 1) % 2;
}

function nextTurn(game: Game): Turn {

    let team: Team = game.turn.team;
    let i: number = game.players.length;
    let gameStep = game;

    do {
        team = rotateTeam(gameStep);
        gameStep = {...game, turn: {...game.turn, team: team}};
    } while (availableMeeples(gameStep).length === 0 && i-- > 0);

    if (i < 0) {

        return {
            count: game.turn.count + 1,
            team: Team.info,
            side: flipSide(game.turn.side)
        };
    } else if (game.players.filter((aPlayer) => aPlayer.swarmSize > 0).length < 2) {

        return {
            ...game.turn,
            count: game.turn.count + 1,
            side: Side.none
        };
    } else {

        return {
            ...game.turn,
            team: team
        };
    }
}

export function positionToIndex(position: Position, boardSize: number): number {

    return (position.row * boardSize + position.col);
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

export function availableMeeples(game: Game): Meeple[] {

    return game.terrains.filter((terrain) => isMeepleAvailable(game, terrain.position))
        .map((terrain) => game.meeples[terrain.topMeeple]);
}

export function isMeepleAvailable(game: Game, position: Position): boolean {

    const meepleIndex = game.terrains[positionToIndex(position, game.boardSize)].topMeeple;

    return meepleIndex !== -1
        && game.meeples[meepleIndex].team === game.turn.team
        && game.meeples[meepleIndex].side === game.turn.side;
}

export function selectSwarm(game: Game, position: Position, selection?: number[]): number[] {

    let resultSelection: number[] = selection ? selection : [];

    const meepleIndex = game.terrains[positionToIndex(position, game.boardSize)].topMeeple;

    if (meepleIndex !== -1
        && game.meeples[meepleIndex].side === game.turn.side
        && game.meeples[meepleIndex].team === game.turn.team
        && !resultSelection.some((mIndex) =>
            position.row === game.meeples[mIndex].position.row && position.col === game.meeples[mIndex].position.col)) {

        resultSelection.push(meepleIndex);

        resultSelection = neighbours(game, position).reduce((acc, pos) => selectSwarm(game, pos, acc), resultSelection);
    }

    return resultSelection.sort((a, b) =>
        positionToIndex(game.meeples[a].position, game.boardSize)
        - positionToIndex(game.meeples[b].position, game.boardSize));
}

export function neighbours(game: Game, position: Position): Position[] {

    return adjacent(game, position)
        .concat(diagonal(game, position));
}

function adjacent(game: Game, position: Position): Position[] {

    const ns = [];

    if (position.row > 0) {

        ns.push({ row: position.row - 1, col: position.col });
    }

    if (position.col > 0) {

        ns.push({ row: position.row, col: position.col - 1 });
    }

    if (position.row < game.boardSize - 1) {

        ns.push({ row: position.row + 1, col: position.col });
    }

    if (position.col < game.boardSize - 1) {

        ns.push({ row: position.row, col: position.col + 1 });
    }

    return ns;
}

function diagonal(game: Game, position: Position): Position[] {

    const ns = [];

    if (position.row > 0 && position.col > 0) {

        ns.push({ row: position.row - 1, col: position.col - 1 });
    }

    if (position.row > 0 && position.col < game.boardSize - 1) {

        ns.push({ row: position.row - 1, col: position.col + 1 });
    }

    if (position.row < game.boardSize - 1 && position.col > 0) {

        ns.push({ row: position.row + 1, col: position.col - 1 });
    }

    if (position.row < game.boardSize - 1 && position.col < game.boardSize - 1) {

        ns.push({ row: position.row + 1, col: position.col + 1 });
    }

    return ns;
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

    } else if (gameMeeples[topMeeple].team !== game.turn.team) {

        lastAction = { explanation: InvalidPlays.WrongTeam };

    } else if (gameMeeples[topMeeple].side !== game.turn.side) {

        lastAction = { explanation:
            (game.turn.side === Side.heads ?
                InvalidPlays.WrongSideHeads :
                InvalidPlays.WrongSideTails) };

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
            lastAction = gameMeeples[topMeeple].topsMeeple === -1
                || meeplesBelow(game, topMeeple).every((meeple) => meeple.team === game.turn.team) ?
                null : { explanation: InvalidPlays.NotOnGround };
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

                meeple.side = flipSide(meeple.side);

                lastAction = action;

                switch (action) {

                    case Action.explore:

                    if (terrainTo.item && !gamePlayers[meeple.team].items[terrainTo.geography]) {

                            gamePlayers[meeple.team].individualActions++;

                            terrainTo.item = false;
                            gamePlayers[meeple.team].items[terrainTo.geography] = true;
                    }

                    gameTerrains[positionToIndex(to, game.boardSize)] = terrainTo;

                    break;

                    case Action.up:
                    case Action.left:
                    case Action.down:
                    case Action.right:

                    terrainFrom.topMeeple = meeple.topsMeeple;
                    terrainFrom.spaceLeft++;

                    if (terrainFrom.topMeeple !== -1) {

                        const freedMeeple = gameMeeples[terrainFrom.topMeeple];

                        if (freedMeeple.team < game.players.length) {

                            freedMeeple.side = freedMeeple.team > meeple.team ? game.turn.side : meeple.side;
                            gameMeeples[terrainFrom.topMeeple] = freedMeeple;
                        }
                    }

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
        skips: game.skips,
        lastAction: lastAction
    };
}

function moveSwarm(game: Game, swarm: number[], action: Action): Game {

    const selection = selectSwarm(game, game.meeples[swarm[0]].position);

    if (selection.every((meepleIndex, i) => swarm[i] === meepleIndex)) {

        const meeples = swarm.map((meepleIndex) => game.meeples[meepleIndex]);

        return (action === Action.right || action === Action.down ?
            meeples.reverse() : meeples)
            .reduce((acc, meeple) => moveMeeple(acc, meeple.position, action), game);

    } else {

        return {
            ...game,
            lastAction: { explanation: InvalidPlays.NoSwarm }
        };
    }
}

function playPattern(game: Game, pattern: number[], meeple?: number): Game {

    return game;
}

export function play(game: Game, play: Play): Game {

    if (game.turn.team !== play.team) {

        return {
            ...game,
            lastAction: { explanation: InvalidPlays.NotYourTurn }
        };
    }

    switch (play.team) {

        case Team.default:

        return {
            ...game,
            turn: {...game.turn, team: Team.info, side: Side.heads},
            lastAction: Action.skip
        };

        default:

        let gameStep: Game;
        let turn: Turn;

        switch (play.play.type) {

            case "individual":

            if (game.players[game.turn.team].individualActions > 0) {

                gameStep = moveMeeple(game, game.meeples[play.play.meepleIndex].position, play.play.action);
                gameStep.players[gameStep.turn.team].individualActions--;
                turn = nextTurn(gameStep);

            } else {

                return {
                    ...game,
                    lastAction: { explanation: InvalidPlays.NoExtraActions }
                };
            }

            break;

            case "pattern":

            gameStep = playPattern(game, play.play.pattern, play.play.meepleIndex);
            turn = nextTurn(gameStep);

            break;

            case "swarm":

            gameStep = moveSwarm(game, play.play.swarm, play.play.action);
            turn = nextTurn(gameStep);

            break;

            case "skip":
            default:

            return {
                ...game,
                turn: turn = nextTurn(game),
                skips: game.skips + 1,
                lastAction: Action.skip
            };
        }

        return {
            ...gameStep,
            turn: turn
        };
    }
}

function playSwarm(game: Game, swarm: number[], action: Action): Game {

    return game;
}

export function newPlay(game: Game, play: Play): Game {

    if (!play.team || game.turn.team !== play.team) {

        return {
            ...game,
            lastAction: { explanation: InvalidPlays.NotYourTurn }
        };
    }

    switch (play.play.type) {

        case "swarm":

        return updateGameState(playSwarm(game, play.play.swarm, play.play.action));

        default:
        case "skip":

        return {
            ...game,
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            lastAction: Action.skip
        };
    }
}

function updateGameState(game: Game): Game {

    return {
        ...game,
        turn: nextTurn(game)
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

            // solution to x = (1 + y) * y / 2, the fundamental arithmetic series
            const geographyIndex = Math.floor((Math.sqrt((Math.random() * 168) + 1) - 1) / 2);

            let topMeeple: number = -1;
            let spaceLeft: number = geographyIndex;

            if (spaceLeft > 1 && Math.random() < 0.12) {

                const meeple: Meeple = {

                    key: meepleKey++,
                    position: position,
                    team: Team.default,
                    side: Side.heads,
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
                geography: geographyIndex,
                spaceLeft: spaceLeft,
                topMeeple: topMeeple,
                item: Math.random() < geographyIndex / 12
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
        } while (terrains[positionToIndex(position, boardSize)].topMeeple > -1);

        const meeple: Meeple = {
            key: meepleKey++,
            position: position,
            team: team,
            side: Side.heads,
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
            items: Array(5).map((o, index) => false)
        };
    }

    const game: Game = {

        boardSize: boardSize,
        players: players,
        terrains: terrains,
        meeples: meeples.slice(),
        turn: {
            count: 0,
            team: Team.default,
            side: Side.none
        },
        skips: 0,
        lastAction: Action.skip
    };

    return game;
}

export function begin(game: Game): Game {

    return {
        ...game,
        turn: {
            count: 0,
            side: Side.heads,
            team:
                game.players.length > 0 ?
                game.players[0].team :
                Team.default
        }
    };
}

export function tutorial(index: number): Game {

    const t = (row: number, col: number, topMeeple: number = -1): Terrain => {

        const geographyIndex = ((row + col) % 5) + 1;

        return {
            position: { row: row, col: col },
            geography: geographyIndex,
            spaceLeft: geographyIndex,
            topMeeple: topMeeple,
            item: false
        };
    };

    const tutorialStepsScenarios: Game[] = [
        // tutorial start
        begin(setup(5)),
        { // the board
            boardSize: 16,
            players: [],
            terrains: [...Array(16).keys()].reduce((acc, row) =>
                acc.concat([...Array(16).keys()].map((col) => t(row, col))), [] as Terrain[]),
            meeples: [],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
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
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
                    topsMeeple: -1
                }
            ],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
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
                    side: Side.heads,
                    strength: 10,
                    resistance: 30,
                    faith: 30,
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
                    topsMeeple: -1
                },
            ],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
            lastAction: Action.skip
        },
        { // the moves
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 1,
                    items: Array(5).map((o, i) => false)
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
                    topsMeeple: -1
                },
            ],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
            lastAction: Action.skip
        },
        { // moving over meeples
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 1,
                    items: Array(5).map((o, i) => false)
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
                    topsMeeple: -1
                },
            ],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
            lastAction: Action.skip
        },
        { // converting a meeple
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 1,
                    items: Array(5).map((o, i) => false)
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
                    topsMeeple: -1
                },
            ],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
            lastAction: Action.skip
        },
        { // battling meeples
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 1,
                    items: Array(5).map((o, i) => false)
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
                    topsMeeple: -1
                },
            ],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
            lastAction: Action.skip
        },
        { // dying meeple
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 1,
                    items: Array(5).map((o, i) => false)
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
                    topsMeeple: -1
                },
            ],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
            lastAction: Action.skip
        },
        { // the swarm
            boardSize: 6,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 5,
                    items: Array(5).map((o, i) => false)
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
                    topsMeeple: -1
                }
            ],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
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
                    side: Side.heads,
                    strength: 5,
                    resistance: 15,
                    faith: 15,
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
                    topsMeeple: -1
                },
            ],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
            lastAction: Action.skip
        },
        { // the conflicts
            boardSize: 6,
            players: [
                {
                    team: Team.info,
                    individualActions: 0,
                    swarmSize: 2,
                    items: Array(5).map((o, i) => false)
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
                    topsMeeple: -1
                }
            ],
            turn: {
                count: 0,
                team: Team.info,
                side: Side.heads
            },
            skips: 0,
            lastAction: Action.skip
        }
    ];

    return tutorialStepsScenarios[index];
}
