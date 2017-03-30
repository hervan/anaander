export type Team =
| "primary"
| "info"
| "success"
| "warning"
| "danger"
| "default";

export const teams: Team[] = [
    "info",
    "warning",
    "success",
    "danger",
    "primary",
    "default"
];

export type Direction =
| "up"
| "left"
| "down"
| "right";

type Position = {
    row: number;
    col: number;
};

export type Geography =
| "city"
| "island"
| "forest"
| "swamp"
| "mountain"
| "plains";

const terrainDistribution: Geography[] = [
    "city",                 // not very frequent
    "island", "island",     // twice the frequency
    "forest", "forest",     // twice the frequency
    "swamp", "swamp",       // twice the frequency
    "mountain", "mountain", // twice the frequency
    "plains", "plains", "plains", "plains" // way more frequent
];

type Item =
| "relic"
| "technology"
| "mineral"
| "food"
| "water";

type Turn =
| "heads"
| "tails";

const turns: Turn[] = [ "heads", "tails" ];

type State =
| "tutorial"
| "setup"
| "play"
| "end";

export type Action =
| "attack"
| "guard"
| "explore"
| "convert"
| "skip";

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
    // hiddenItems: Item[];
};

export type Player = {
    team: Team;
    individualActions: number;
    swarmSize: number;
    // items: Item[];
};

export type Step = {
    step: number;
};

export type Play = {
    state: State;
    player: Team;
    from: Position | "player";
    action: Direction | Action | Step | null;
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
    TerrainIsCrowded: "move to a terrain with space available."
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
    state: State;
    lastAction: Direction | Action | InvalidPlay;
};

export function logBoard(game: Game): void {

    let teams: IDictionary = {
        "info": "1",
        "warning": "2",
        "success": "3",
        "danger": "4",
        "primary": "5",
        "default": "o"
    };

    let board: string = "";
    game.terrains.forEach((terrain, index) => {
        board += (terrain.topMeeple === -1 ? "#" : teams[game.meeples[terrain.topMeeple].team])
            + (index % game.boardSize === game.boardSize - 1 ? "\n" : "");
    });

    console.log(board);
}

function nextPlayer(game: Game): Team {

    let player: Team = game.currentPlayer;
    let i: number = game.players.length;

    do {
        player = teams[(teams.indexOf(player) + 1) % game.players.length];
    } while (game.players.length > 0 && game.players[teams.indexOf(player)].swarmSize === 0 && i-- > 0);

    return player;
}

function flipTurn(turn: Turn): Turn {

    return (turns[(turns.indexOf(turn) + 1) % turns.length]);
}

function nextTurn(game: Game): Turn {

    return teams.indexOf(nextPlayer(game)) <= teams.indexOf(game.currentPlayer) ?
        flipTurn(game.turn) :
        game.turn;
}

function positionToIndex(position: Position, boardSize: number): number {

    return (position.row * boardSize + position.col);
}

export function meeplesBelow(game: Game, meepleIndex: number, acc: Meeple[]): Meeple[] {

    const meeple: Meeple = game.meeples[meepleIndex];
    acc.push(meeple);

    if (meeple.topsMeeple !== -1) {

        return meeplesBelow(game, meeple.topsMeeple, acc);

    } else {

        return acc;
    }
}

function moveMeeple(game: Game, from: Position, action: Direction | Action): Game {

    const gameMeeples: Meeple[] = game.meeples.slice();
    const gameTerrains: Terrain[] = game.terrains.slice();
    const gamePlayers: Player[] = game.players.slice();

    const terrainFrom: Terrain = gameTerrains[positionToIndex(from, game.boardSize)];

    const topMeeple: number = terrainFrom.topMeeple;

    let lastAction: Direction | Action | InvalidPlay | null = null;

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

            case "left":
            to.col = from.col - 1;
            break;

            case "right":
            to.col = from.col + 1;
            break;

            case "up":
            to.row = from.row - 1;
            break;

            case "down":
            to.row = from.row + 1;
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

                terrainFrom.topMeeple = meeple.topsMeeple;
                terrainFrom.spaceLeft++;
                meeple.topsMeeple = terrainTo.topMeeple;
                terrainTo.topMeeple = meeple.key;
                terrainTo.spaceLeft--;

                meeple.position = to;

                gameMeeples[meeple.key] = meeple;

                lastAction = action;

                if (meeple.topsMeeple !== -1
                    && gameMeeples[meeple.key].team !== gameMeeples[meeple.topsMeeple].team) {

                    const meepleOver: Meeple = gameMeeples[meeple.key];
                    const meepleUnder: Meeple = gameMeeples[meeple.topsMeeple];

                    if (meepleOver.faith > meepleUnder.faith + meepleUnder.strength) {

                        if (teams.indexOf(meepleUnder.team) < gamePlayers.length) {

                            gamePlayers[teams.indexOf(meepleUnder.team)].swarmSize--;
                        }

                        meepleUnder.team = meepleOver.team;
                        gamePlayers[teams.indexOf(meepleOver.team)].swarmSize++;
                        meepleOver.resistance += meepleUnder.resistance;

                    } else {

                        meepleUnder.resistance -= meepleOver.strength;
                        meepleOver.resistance -= meepleUnder.strength;

                        if (meepleUnder.resistance <= 0) {

                            meepleUnder.key = -1;
                            meepleOver.topsMeeple = meepleUnder.topsMeeple;
                            meepleOver.faith += meepleUnder.faith;
                            terrainTo.spaceLeft++;

                            if (teams.indexOf(meepleUnder.team) < gamePlayers.length) {

                                gamePlayers[teams.indexOf(meepleUnder.team)].swarmSize--;
                            }
                        }

                        if (meepleOver.resistance <= 0) {

                            meepleOver.key = -1;
                            terrainTo.topMeeple = meepleOver.topsMeeple;
                            meepleUnder.faith += meepleOver.faith;
                            terrainTo.spaceLeft++;

                            gamePlayers[teams.indexOf(meepleOver.team)].swarmSize--;
                        }
                    }
                }

                gameTerrains[positionToIndex(from, game.boardSize)] = terrainFrom;
                gameTerrains[positionToIndex(to, game.boardSize)] = terrainTo;
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
        state: game.state,
        lastAction: lastAction
    };
}

function moveSwarm(game: Game, action: Direction | Action): Game {

    const availablePlayerMeeples: number[] =
        game.terrains.map((terrain) => terrain.topMeeple)
            .filter((topMeeple) =>
                topMeeple !== -1 &&
                game.meeples[topMeeple].team === game.currentPlayer &&
                game.meeples[topMeeple].turn === game.turn);

    return (action === "right" || action === "down" ?
        availablePlayerMeeples.reverse() :
        availablePlayerMeeples)
        .map((meepleIndex) => game.meeples[meepleIndex])
        .reduce((acc, meeple) => moveMeeple(acc, meeple.position, action), game);
}

export function play(game: Game, play: Play): Game {

    if (play.state === "setup") {

        return {

            boardSize: game.boardSize,
            players: game.players.slice(),
            terrains: game.terrains.slice(),
            meeples: game.meeples.slice(),
            turn: game.turn,
            currentPlayer: game.currentPlayer,
            state: game.state,
            lastAction: { explanation: InvalidPlays.NoGameYet }
        };
    } else if (game.currentPlayer !== play.player) {

        return {

            boardSize: game.boardSize,
            players: game.players.slice(),
            terrains: game.terrains.slice(),
            meeples: game.meeples.slice(),
            turn: game.turn,
            currentPlayer: game.currentPlayer,
            state: game.state,
            lastAction: { explanation: InvalidPlays.NotYourTurn }
        };
    }

    switch (play.player) {

        case "default":

        return {

            boardSize: game.boardSize,
            players: game.players.slice(),
            terrains: game.terrains.slice(),
            meeples: game.meeples.slice(),
            turn: game.turn,
            currentPlayer: teams[0],
            state: play.state,
            lastAction: "skip"
        };

        default:

        let gameStep: Game;
        let player: Team;
        let turn: Turn;

        switch (play.from) {

            case "player":

            gameStep = moveSwarm(game, play.action as Direction | Action);
            player = nextPlayer(gameStep);
            turn = nextTurn(gameStep);

            break;

            default:

            gameStep = moveMeeple(game, play.from as Position, play.action as Direction | Action);
            player = nextPlayer(gameStep);
            turn = gameStep.turn;

            break;
        }

        let state: State = gameStep.state;

        if (gameStep.players.filter((player) => player.swarmSize > 0).length < 2) {

            state = "end";
        }

        return {

            boardSize: gameStep.boardSize,
            players: gameStep.players.slice(),
            terrains: gameStep.terrains.slice(),
            meeples: gameStep.meeples.slice(),
            turn: turn,
            currentPlayer: player,
            state: state,
            lastAction: gameStep.lastAction
        };
    }
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

            let topMeeple: number = -1;
            let spaceLeft: number = Math.ceil(Math.random() * 6);

            if (spaceLeft > 1 && Math.random() < 0.12) {

                const meeple: Meeple = {

                    key: meepleKey++,
                    position: position,
                    team: teams[teams.length - 1],
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
                geography: terrainDistribution[Math.floor(Math.random() * terrainDistribution.length)],
                spaceLeft: spaceLeft,
                topMeeple: topMeeple
            };
        }
    }

    const players: Player[] = new Array<Player>();
    let i: number = 0;
    meepleKey = 0;

    for (let team of teams) {

        if (i < playerCount) {

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

            players[teams.indexOf(team)] = {
                team: team,
                individualActions: 0,
                swarmSize: 1
            };

            i++;
        }
    }

    const game: Game = {

        boardSize: boardSize,
        players: players,
        terrains: terrains,
        meeples: meeples.slice(),
        turn: turns[0],
        currentPlayer: "default",
        state: "setup",
        lastAction: { explanation: InvalidPlays.None }
    };

    return game;
}

function t(row: number, col: number, topMeeple: number = -1): Terrain {
    return {
        position: { row: row, col: col },
        geography: "plains",
        spaceLeft: 1,
        topMeeple: topMeeple
    };
}

export function tutorial(index: number): { game: Game, plays: Array<Direction | Action> } {

    switch (index) {

        case 0:

        // let gameStep = this.play(setup(5), {
        //     state: "tutorial",
        //     player: "default",
        //     from: "player",
        //     action: null
        // });

        // return ({
        //     game: gameStep,
        //     plays: [
        //         "up", "up", "up", "up", "up",
        //         "left", "left", "left", "left", "left",
        //         "down", "down", "down", "down", "down",
        //         "right", "right", "right", "right", "right"
        //     ]
        // });

        default:

        return ({
            game: {
                boardSize: 6,
                players: [
                    {
                        team: "info",
                        individualActions: 0,
                        swarmSize: 5
                    },
                    {
                        team: "warning",
                        individualActions: 0,
                        swarmSize: 5
                    }
                ],
                terrains: [
                    t(0, 0),    t(0, 1),    t(0, 2),    t(0, 3),    t(0, 4),    t(0, 5),
                    t(1, 0),    t(1, 1),    t(1, 2),    t(1, 3),    t(1, 4),    t(1, 5),
                    t(2, 0),    t(2, 1),    t(2, 2, 1), t(2, 3, 0), t(2, 4),    t(2, 5),
                    t(3, 0),    t(3, 1),    t(3, 2),    t(3, 3, 2), t(3, 4),    t(3, 5),
                    t(4, 0),    t(4, 1),    t(4, 2),    t(4, 3),    t(4, 4),    t(4, 5),
                    t(5, 0),    t(5, 1),    t(5, 2),    t(5, 3),    t(5, 4),    t(5, 5)
                ],
                meeples: [
                    {
                        key: 0,
                        position: { row: 2, col: 3 },
                        team: "info",
                        turn: "heads",
                        strength: 10,
                        resistance: 30,
                        faith: 30,
                        topsMeeple: -1
                    },
                    {
                        key: 1,
                        position: { row: 2, col: 2 },
                        team: "warning",
                        turn: "heads",
                        strength: 10,
                        resistance: 30,
                        faith: 30,
                        topsMeeple: -1
                    },
                    {
                        key: 2,
                        position: { row: 3, col: 3 },
                        team: "default",
                        turn: "heads",
                        strength: 5,
                        resistance: 15,
                        faith: 15,
                        topsMeeple: -1
                    }
                ],
                turn: "heads",
                currentPlayer: "info",
                state: "tutorial",
                lastAction: "skip"
            },
            plays: ["down"]
        });
    }
}
