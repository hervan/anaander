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
            faith - constrains ease of conversion, or number of conversions per action/turn/round
                ease of conversion is a good option because it makes it easier to convert,
                but remains unrelated to other already favorable situations
            technology - constrains number of buildings

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
    remote attack, teleportation

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
    explore
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

export enum Item {
    energy,
    food,
    ore,
    relic,
    technology
};

export const GeographyItem = [
    { type: "sea", item: null, piece: null },
    { type: "swamp", item: Item.energy, piece: "i" },
    { type: "mountain", item: Item.food, piece: "l" },
    { type: "forest", item: Item.ore, piece: "o" },
    { type: "valley", item: Item.relic, piece: "s" },
    { type: "plains", item: Item.technology, piece: "t" },
    { type: "desert", item: null, piece: null }
];

const PieceShape: { [key: string]: Position[] } = {
    i: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}, {row: 3, col: 0}],
    l: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}, {row: 2, col: 1}],
    o: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 1, col: 1}, {row: 0, col: 1}],
    s: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 1, col: 1}, {row: 2, col: 1}],
    t: [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}, {row: 1, col: 1}]
};

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
    defense: number;
    team: Team;
};

export type Terrain = {
    position: Position;
    geography: Geography;
    spaceLeft: number;
    topMeeple: number;
    item: boolean;
    patch?: number;
    city?: City;
};

export type Player = {
    team: Team;
    cities: number;
    swarmSize: number;
    items: boolean[];
    usedActions: number;
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
    }
};

const InvalidPlays: { [key: string]: string } = {
    MeepleNotAvailable: "choose a meeple of your own team and with the current turn side up.",
    OutOfBoard: "keep your meeples inside the board.",
    NotYourTurn: "wait for your turn to begin.",
    TerrainIsCrowded: "move to a terrain with space available.",
    NotOnGround: "only meeples on the ground can explore the terrain",
    NoSelection: "please select meeples before choosing the action",
    NoExtraActions: "you need to control more cities to perform more actions",
    NoSwarm: "you must play a whole swarm, or spend extra actions"
};

type Turn = {
    round: number;
    team: Team;
    side: Side;
};

type Outcome = {
        type: "action"
        action: Action
    } | {
        type: "pattern"
        pattern: Item;
    } | {
        type: "invalid"
        explanation: string;
    } | {
        type: "none"
    } | {
        type: "gameover"
    };

export type Game = {
    boardSize: number;
    players: Player[];
    terrains: Terrain[];
    meeples: Meeple[];
    turn: Turn;
    outcome: Outcome;
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
    let i: number = game.players.length - 1;

    if (i < 0) {

        return team;
    }

    do {
        team = (team + 1) % game.players.length;
    } while (i-- > 0 && availableMeeples({...game, turn: {...game.turn, team: team}}).length === 0);

    return team;
}

function flipSide(side: Side): Side {

    return (side + 1) % 2;
}

function nextTurn(game: Game): Turn {

    let nextTeam: Team = game.turn.team;
    let i: number = game.players.length;
    let gameStep = game;

    nextTeam = rotateTeam(gameStep);

    if (availableMeeples({...game, turn: {...game.turn, team: nextTeam}}).length === 0) {
        // no more actions left this round
        return {
            round: game.turn.round + 1,
            team: Team.info,
            side: flipSide(game.turn.side)
        };
    } else {
        // next team can play this round yet
        return {
            ...game.turn,
            team: nextTeam
        };
    }
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

    const terrain = game.terrains[positionToIndex(position, game.boardSize)];
    const meepleIndex = terrain.topMeeple;
    const meeple = game.meeples[meepleIndex];

    return meepleIndex !== -1
        && meeple.team === game.turn.team
        && meeple.side === game.turn.side
        && (!terrain.city || meeple.team === terrain.city.team);
}

export function selectSwarm(game: Game, position: Position, selection?: number[]): number[] {

    let resultSelection: number[] = selection ? selection : [];

    const meepleIndex = game.terrains[positionToIndex(position, game.boardSize)].topMeeple;

    if (isMeepleAvailable(game, position)
        && !resultSelection.some((mIndex) =>
            position.row === game.meeples[mIndex].position.row && position.col === game.meeples[mIndex].position.col)) {

        resultSelection.push(meepleIndex);

        resultSelection = neighbours(position, game.boardSize)
            .reduce((acc, pos) => selectSwarm(game, pos, acc), resultSelection);
    }

    return resultSelection.sort((a, b) =>
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
            outcome: {
                type: "invalid",
                explanation: InvalidPlays.NotYourTurn
            }
        };
    }

    switch (play.play.type) {

        case "swarm": {

            const gameStep = playSwarm(game, play.play.action, play.play.swarm);
            const nt = nextTurn(gameStep);

            if (nt.side !== gameStep.turn.side) {

                gameStep.players = gameStep.players.map((player) => { return {
                    ...player,
                    usedActions: 0
                }; });
            }

            return {
                ...gameStep,
                turn: nt,
                outcome: isOver(gameStep) ?
                    { type: "gameover" } :
                    {
                        type: "action",
                        action: play.play.action
                    }
            };
        }

        case "pattern": {

            const gameStep = playPattern(game, play.play.pattern, play.play.meepleIndex);
            const nt = nextTurn(gameStep);

            if (nt.side !== gameStep.turn.side) {

                gameStep.players = gameStep.players.map((player) => { return {
                    ...player,
                    usedActions: 0
                }; });
            }

            return {
                ...gameStep,
                turn: nt,
                outcome: isOver(gameStep) ?
                    { type: "gameover" } :
                    {
                        type: "pattern",
                        pattern: Item.energy
                    }
            };
        }

        case "individual": {

            const swarm = [play.play.meepleIndex];
            let gameStep: Game = game;

            while (swarm.length > 0) {

                const meepleKey: number = swarm.splice(0, 1)[0];
                gameStep = playIndividual(gameStep, play.play.action, meepleKey);

                const meeple = gameStep.meeples[meepleKey];
                adjacent(meeple.position, gameStep.boardSize).forEach((position) => {
                    if (isMeepleAvailable(gameStep, position)) {

                        swarm.push(gameStep.terrains[positionToIndex(position, gameStep.boardSize)].topMeeple);
                    }
                });
            }
            const nt = nextTurn(gameStep);

            if (nt.side !== gameStep.turn.side) {

                gameStep.players = gameStep.players.map((player) => { return {
                    ...player,
                    usedActions: 0
                }; });
            }

            return {
                ...gameStep,
                turn: nt,
                outcome: isOver(gameStep) ?
                    { type: "gameover" } :
                    {
                        type: "action",
                        action: play.play.action
                    }
            };
        }

        default:
        case "skip":

        const nt = nextTurn(game);

        return {
            ...game,
            turn: nt,
            outcome: { type: "none" }
        };
    }
}

function playSwarm(game: Game, action: Action, swarm: number[]): Game {

    const meeple = game.meeples[swarm[0]];

    const selection = selectSwarm(game, game.meeples[swarm[0]].position);

    if (selection.every((meepleIndex, i) => swarm[i] === meepleIndex)) {

        const meeplePositionIndices = swarm.map((meepleIndex) =>
            positionToIndex(game.meeples[meepleIndex].position, game.boardSize));

        return (action === Action.right || action === Action.down ?
            meeplePositionIndices.reverse() : // make sure a meeple won't jump on a meeple of the same swarm
            meeplePositionIndices)
            .map((mpi) => game.terrains[mpi].topMeeple)
            .reduce((acc, meepleIndex) => playMeeple(acc, action, meepleIndex), game);

    } else {

        return {
            ...game,
            outcome: {
                type: "invalid",
                explanation: InvalidPlays.NoSwarm
            }
        };
    }
}

function playPattern(game: Game, pattern: number[], meepleIndex: number): Game {

    return game;
}

function playIndividual(game: Game, action: Action, meepleIndex: number): Game {

    if (game.players[game.turn.team].usedActions < game.players[game.turn.team].cities + 1) {

        const gameStep = playMeeple(game, action, meepleIndex);
        const players = gameStep.players;

        if (gameStep.outcome.type === "action") {

            players[gameStep.turn.team].usedActions++;
        }

        return {
            ...gameStep,
            players: players
        };
    } else {

        return {
            ...game,
            outcome: {
                type: "invalid",
                explanation: InvalidPlays.NoExtraActions
            }
        };
    }
}

function exploreTerrain(game: Game, position: Position): Game {

    const origin = game.terrains[positionToIndex(position, game.boardSize)];

    if (meeplesBelow(game, origin.topMeeple).every((m) => m.team === game.turn.team)) {

        const gameTerrains = game.terrains.slice();
        const gamePlayers = game.players.slice();
        const gameMeeples = game.meeples.slice();

        const player = gamePlayers[game.turn.team];
        const meeple = gameMeeples[origin.topMeeple];

        if (origin.item && !player.items[origin.geography - 1]) {

            player.cities++;

            origin.item = false;
            player.items[origin.geography - 1] = true;

            gameTerrains[positionToIndex(position, game.boardSize)] = origin;
            gamePlayers[game.turn.team] = player;
        }

        meeple.side = flipSide(meeple.side);
        gameMeeples[origin.topMeeple] = meeple;

        return {
            ...game,
            terrains: gameTerrains,
            players: gamePlayers,
            meeples: gameMeeples,
            outcome: {
                type: "action",
                action: Action.explore
            }
        };
    } else {

        return {
            ...game,
            outcome: {
                type: "invalid",
                explanation: InvalidPlays.NotOnGround
            }
        };
    }
}

function convertMeeple(game: Game, meepleOver: Meeple, meepleUnder: Meeple): Game {

    const gamePlayers = game.players.slice();
    const gameMeeples = game.meeples.slice();

    if (meepleUnder.team < gamePlayers.length) {

        gamePlayers[meepleUnder.team].swarmSize--;
    }

    meepleUnder.team = meepleOver.team;
    gamePlayers[meepleOver.team].swarmSize++;
    meepleOver.resistance += meepleUnder.resistance;

    gameMeeples[meepleOver.key] = meepleOver;
    gameMeeples[meepleUnder.key] = meepleUnder;

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

    meepleUnder.resistance -= meepleOver.strength;
    meepleOver.resistance -= meepleUnder.strength;

    if (meepleUnder.resistance <= 0) {

        meepleUnder.key = -1;
        meepleOver.topsMeeple = meepleUnder.topsMeeple;
        meepleOver.faith += meepleUnder.faith;
        terrain.spaceLeft++;

        if (meepleUnder.team < gamePlayers.length) {

            gamePlayers[meepleUnder.team].swarmSize--;
        }
    }

    if (meepleOver.resistance <= 0) {

        meepleOver.key = -1;
        terrain.topMeeple = meepleOver.topsMeeple;
        meepleUnder.faith += meepleOver.faith;
        terrain.spaceLeft++;

        gamePlayers[meepleOver.team].swarmSize--;
    }

    return {
        ...game,
        players: gamePlayers,
        meeples: gameMeeples,
        terrains: gameTerrains
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
    const city: City = terrain.city!;
    const attack = meeplesBelow(game, meeple.key)
        .filter((m) => m.team === meeple.team)
        .reduce((acc, m) => acc + m.strength, 0);

    if (attack >= city.defense) {

        city.team = meeple.team;

        const terrains = game.terrains.slice();
        terrains[positionToIndex(position, game.boardSize)] = {
            ...terrain,
            city: city
        };

        const players = game.players.slice();
        const player = players[meeple.team];
        player.cities++;
        players[meeple.team] = player;

        const meeples = game.meeples.slice();
        meeple.strength += Math.floor(Math.sqrt(meeple.strength * city.defense));
        meeples[meeple.key] = meeple;

        return {
            ...game,
            terrains: terrains,
            meeples: meeples,
            players: players
        };
    }

    return game;
}

function moveMeeple(game: Game, action: Action, meeple: Meeple): Game {

    const from = {...meeple.position};
    const to = {...meeple.position};

    switch (action) {

        case Action.up:
        to.row = from.row - 1;
        break;

        case Action.left:
        to.col = from.col - 1;
        break;

        case Action.down:
        to.row = from.row + 1;
        break;

        case Action.right:
        to.col = from.col + 1;
        break;
    }

    if (!adjacent(from, game.boardSize).some((pos) => pos.row === to.row && pos.col === to.col)) {

        return {
            ...game,
            outcome: {
                type: "invalid",
                explanation: InvalidPlays.OutOfBoard
            }
        };
    }

    const terrainFrom: Terrain = game.terrains[positionToIndex(from, game.boardSize)];
    const terrainTo: Terrain = game.terrains[positionToIndex(to, game.boardSize)];

    if (terrainTo.spaceLeft < 1
        || (terrainTo.city
            && terrainTo.topMeeple !== -1
            && game.meeples[terrainTo.topMeeple].team !== meeple.team)) {

        return {
            ...game,
            outcome: {
                type: "invalid",
                explanation: InvalidPlays.TerrainIsCrowded
            }
        };
    }

    terrainFrom.topMeeple = meeple.topsMeeple;
    terrainFrom.spaceLeft++;

    const gameMeeples = game.meeples.slice();

    meeple.side = flipSide(meeple.side);

    if (terrainFrom.topMeeple !== -1) {

        const freedMeeple = gameMeeples[terrainFrom.topMeeple];

        if (freedMeeple.team < game.players.length) {

            freedMeeple.side = freedMeeple.team > meeple.team ? game.turn.side : meeple.side;
            gameMeeples[terrainFrom.topMeeple] = freedMeeple;
        }
    }

    meeple.topsMeeple = terrainTo.topMeeple;
    meeple.position = to;

    gameMeeples[meeple.key] = meeple;

    terrainTo.topMeeple = meeple.key;
    terrainTo.spaceLeft--;

    const gameTerrains = game.terrains.slice();
    gameTerrains[positionToIndex(from, game.boardSize)] = terrainFrom;
    gameTerrains[positionToIndex(to, game.boardSize)] = terrainTo;

    const gameStep: Game = {
        ...game,
        terrains: gameTerrains,
        meeples: gameMeeples,
        outcome: {
            type: "action",
            action: action
        }
    };

    if (terrainTo.city && terrainTo.city.team !== meeple.team) {

        return marchInto(gameStep, meeple, to);
    }

    if (meeple.topsMeeple !== -1 && gameMeeples[meeple.key].team !== gameMeeples[meeple.topsMeeple].team) {

        return solveMeepleConflict(gameStep, to);
    }

    return gameStep;
}

function playMeeple(game: Game, action: Action, meepleIndex: number): Game {

    if (meepleIndex < 0 || !(meepleIndex < game.meeples.length)) {

        return {
            ...game,
            outcome: {
                type: "invalid",
                explanation: InvalidPlays.MeepleNotAvailable
            }
        };
    }

    const meeple = game.meeples[meepleIndex];

    if (!isMeepleAvailable(game, meeple.position)) {

        return {
            ...game,
            outcome: {
                type: "invalid",
                explanation: InvalidPlays.MeepleNotAvailable
            }
        };
    }

    const gameMeeples = game.meeples.slice();

    switch (action) {

        case Action.hold:

        meeple.side = flipSide(meeple.side);
        gameMeeples[meepleIndex] = meeple;

        return {
            ...game,
            meeples: gameMeeples,
            outcome: {
                type: "action",
                action: action
            }
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

function flipShape(position: Position[]): Position[] {

    return position.map(({row, col}) => ({row: row, col: -1 * col}));
}

function rotateShape(position: Position[]): Position[] {

    return position.map(({row, col}) => ({row: -1 * col, col: row}));
}

export function setup(playerCount: number = 0, boardSize: number = 16): Game {

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

    const terrains: Terrain[] = new Array<Terrain>();
    const patchesPerDimension = Math.ceil(Math.sqrt(5 * playerCount));
    const patchLength = boardSize / patchesPerDimension;
    const defaultPatchArea = Math.PI * ((patchLength - 0.5) / 2) ** 2;

    const patchSeeds: Position[] =
        [...Array(patchesPerDimension ** 2).keys()].map((idx) =>
            ({
                row: Math.round((patchLength / 2) + (patchLength * Math.floor(idx / patchesPerDimension))),
                col: Math.round((patchLength / 2) + (patchLength * (idx % patchesPerDimension)))
            })
        );

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

            let itemPos: Position;
            do {
                itemPos = patch[Math.floor(Math.random() * patch.length)];

            } while (itemPos.row === cityPosition.row && itemPos.col === cityPosition.col);

            const geographyIndex = Math.ceil(Math.random() * 5) + 1;
            const boundaries: Position[] = [];

            patch.forEach((position) => {

                let spaceLeft = geographyIndex;
                let city: City | undefined = undefined;

                if (position.row === cityPosition.row
                    && position.col === cityPosition.col) {

                    spaceLeft--;
                    city = {
                        name: cityNames.splice(Math.floor(Math.random() * cityNames.length), 1)[0],
                        defense: 10 + (spaceLeft * Math.ceil(Math.random() * 5)),
                        team: Team.default
                    };
                }

                terrains[positionToIndex(position, boardSize)] = {
                    geography: geographyIndex,
                    item: position.row === itemPos.row && position.col === itemPos.col,
                    position: position,
                    spaceLeft: spaceLeft,
                    topMeeple: -1,
                    city: city
                };

                boundaries.push(...neighbours(position, boardSize)
                    .filter((pos) => patch.every((p) => pos.row !== p.row || pos.col !== p.col))
                    .filter((pos) => insideBoard(position, boardSize))
                    .filter((pos) => !terrains[positionToIndex(pos, boardSize)]));
            });

            boundaries.forEach((position) => {
                terrains[positionToIndex(position, boardSize)] = {
                    geography: Geography.desert,
                    item: position.row === itemPos.row && position.col === itemPos.col,
                    position: position,
                    spaceLeft: 1,
                    topMeeple: -1
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

            const terrain = terrains[positionToIndex(position, boardSize)] ?
                terrains[positionToIndex(position, boardSize)] :
                {
                    geography: Math.random() < 0.5
                        && neighbours(position, boardSize)
                        .filter((pos) =>
                            terrains[positionToIndex(pos, boardSize)] !== undefined
                            && terrains[positionToIndex(pos, boardSize)].geography === Geography.sea)
                        .length < 4 ?
                        Geography.sea :
                        Geography.desert,
                    item: false,
                    position: position,
                    spaceLeft: 1,
                    topMeeple: -1
                };

            const geographyIndex = terrain.geography;
            let topMeeple: number = -1;
            let spaceLeft: number = terrain.geography === Geography.sea ? 0 : terrain.spaceLeft;

            if (!terrain.city && Math.random() < 0.1 * (spaceLeft - 1)) {

                const meeple: Meeple = {

                    key: meepleKey++,
                    position: position,
                    team: Math.random() < 0.5 ? Team.info : Team.warning,
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
        } while (terrains[positionToIndex(position, boardSize)].city
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
            topsMeeple: -1
        };

        terrains[positionToIndex(position, boardSize)].topMeeple = meeple.key;
        terrains[positionToIndex(position, boardSize)].spaceLeft--;
        meeples[meeple.key] = meeple;

        players[team] = {
            team: team,
            cities: 0,
            swarmSize: 1,
            items: Array(5).map((o, index) => false),
            usedActions: 0
        };
    }

    const game: Game = {

        boardSize: boardSize,
        players: players,
        terrains: terrains,
        meeples: meeples,
        turn: {
            round: 0,
            team: Team.default,
            side: Side.none
        },
        outcome: { type: "none" }
    };

    return game;
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
        },
        { // the moves
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    cities: 0,
                    swarmSize: 1,
                    items: Array(5).map((o, i) => false),
                    usedActions: 0
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
        },
        { // moving over meeples
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    cities: 0,
                    swarmSize: 1,
                    items: Array(5).map((o, i) => false),
                    usedActions: 0
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
        },
        { // converting a meeple
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    cities: 0,
                    swarmSize: 1,
                    items: Array(5).map((o, i) => false),
                    usedActions: 0
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
        },
        { // battling meeples
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    cities: 0,
                    swarmSize: 1,
                    items: Array(5).map((o, i) => false),
                    usedActions: 0
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
        },
        { // dying meeple
            boardSize: 4,
            players: [
                {
                    team: Team.info,
                    cities: 0,
                    swarmSize: 1,
                    items: Array(5).map((o, i) => false),
                    usedActions: 0
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
        },
        { // the swarm
            boardSize: 6,
            players: [
                {
                    team: Team.info,
                    cities: 0,
                    swarmSize: 5,
                    items: Array(5).map((o, i) => false),
                    usedActions: 0
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
        },
        { // the conflicts
            boardSize: 6,
            players: [
                {
                    team: Team.info,
                    cities: 0,
                    swarmSize: 2,
                    items: Array(5).map((o, i) => false),
                    usedActions: 0
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
                round: 0,
                team: Team.info,
                side: Side.heads
            },
            outcome: { type: "none" }
        }
    ];

    return tutorialStepsScenarios[index];
}
