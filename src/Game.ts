export type Color =
| "primary"
| "info"
| "success"
| "warning"
| "danger"
| "default";

const colors: Color[] = [
    "info",
    "warning",
    "success",
    "danger",
    "primary",
    "default"
];

type Direction =
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
| "setup"
| "play"
| "end";

type Action =
| "attack"
| "guard"
| "explore"
| "convert"
| "skip";

export type Meeple = {
    key: number;
    position: Position;
    color: Color;
    turn: Turn;
    strength: number;
    resistance: number;
    faith: number;
    topsMeeple: number;
};

export type Terrain = {
    position: Position;
    geography: Geography;
    maxMeeples: number;
    topMeeple: number;
    // hiddenItems: Item[];
};

export type Player = {
    color: Color;
    individualActions: number;
    // items: Item[];
};

export type Play = {
    state: State;
    player: Color;
    from: Position | "player";
    action: Direction | Action | null;
};

interface IDictionary {
    [key: string]: string;
};

const InvalidPlays: IDictionary = {
    WrongColor: "move a meeple of your own color.",
    WrongTurnHeads: "move a meeple with heads up.",
    WrongTurnTails: "move a meeple with tails up.",
    EmptyTerrain: "choose a terrain with a meeple in it.",
    NoGameYet: "wait for a game to begin.",
    OutOfBoard: "keep your meeples inside the board.",
    NotYourTurn: "wait for your turn to begin."
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
    currentPlayer: Color;
    state: State;
    lastAction: Direction | Action | InvalidPlay;
};

export function logBoard(game: Game): void {

    let colors: IDictionary = {
        "info": "1",
        "warning": "2",
        "success": "3",
        "danger": "4",
        "primary": "5",
        "default": "o"
    };

    let board: string = "";
    game.terrains.forEach((terrain, index) => {
        board += (terrain.topMeeple === -1 ? "#" : colors[game.meeples[terrain.topMeeple].color])
            + (index % game.boardSize === game.boardSize - 1 ? "\n" : "");
    });

    console.log(board);
}

function nextPlayer(game: Game): Color {

    return colors[(colors.indexOf(game.currentPlayer) + 1) % game.players.length];
}

function flipTurn(turn: Turn): Turn {

    return (turns[(turn.indexOf(turn) + 1) % turns.length]);
}

function nextTurn(game: Game): Turn {

    return colors.indexOf(nextPlayer(game)) === 0 ?
        flipTurn(game.turn) :
        game.turn;
}

function positionToIndex(position: Position, boardSize: number): number {

    return (position.row * boardSize + position.col);
}

function moveMeeple(game: Game, from: Position, action: Direction | Action): Game {

    const gameMeeples: Meeple[] = game.meeples.slice();
    const gameTerrains: Terrain[] = game.terrains.slice();
    const topMeeple: number = gameTerrains[positionToIndex(from, game.boardSize)].topMeeple;

    let lastAction: Direction | Action | InvalidPlay | null = null;

    let to: Position = {
        row: from.row,
        col: from.col
    };

    if (topMeeple === -1) {

        lastAction = { explanation: InvalidPlays.EmptyTerrain };

    } else if ((gameMeeples[topMeeple].color as Color) !== game.currentPlayer) {

        lastAction = { explanation: InvalidPlays.WrongColor };

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
        }

        if (lastAction == null) {

            const meeple: Meeple = gameMeeples[topMeeple];

            meeple.turn = flipTurn(meeple.turn);

            gameTerrains[positionToIndex(from, game.boardSize)].topMeeple = meeple.topsMeeple;
            meeple.topsMeeple = gameTerrains[positionToIndex(to, game.boardSize)].topMeeple;
            gameTerrains[positionToIndex(to, game.boardSize)].topMeeple = meeple.key;

            meeple.position = to;

            gameMeeples[meeple.key] = meeple;

            lastAction = action;
        }
    }

    return {

        boardSize: game.boardSize,
        players: game.players.slice(),
        terrains: gameTerrains.slice(),
        meeples: gameMeeples.slice(),
        turn: game.turn,
        currentPlayer: game.currentPlayer,
        state: game.state,
        lastAction: lastAction
    };
}

function playerMeeples(game: Game, player?: Color): number[] {

    return game.meeples.filter((meeple) =>
        meeple.color === (player ? player : game.currentPlayer))
            .map((meeple) => meeple.key);
}

function moveSwarm(game: Game, action: Direction | Action): Game {

    return playerMeeples(game).map((meepleIndex) => game.meeples[meepleIndex])
        .reduce((acc, meeple) => moveMeeple(acc, meeple.position, action), game);
}

export function play(game: Game, play: Play): Game {

    if (play.state !== "play") {

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
                currentPlayer: colors[0],
                state: play.state,
                lastAction: "skip"
            };

        default:

            let gameStep: Game;
            let player: Color;
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

            return {

                boardSize: gameStep.boardSize,
                players: gameStep.players.slice(),
                terrains: gameStep.terrains.slice(),
                meeples: gameStep.meeples.slice(),
                turn: turn,
                currentPlayer: player,
                state: gameStep.state,
                lastAction: gameStep.lastAction
            };
    }
}

export function setup(playerCount: number, boardSize: number = 16): Game {

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

            if (Math.random() < 0.1) {

                const meeple: Meeple = {

                    key: meepleKey++,
                    position: position,
                    color: colors[colors.length - 1],
                    turn: turns[0],
                    strength: (10 / Math.ceil(Math.random() * 10)),
                    resistance: (10 / Math.ceil(Math.random() * 10)),
                    faith: (10 / Math.ceil(Math.random() * 10)),
                    topsMeeple: -1
                };

                topMeeple = meeple.key;
                meeples[meeple.key] = meeple;
            }

            terrains[positionToIndex(position, boardSize)] = {

                position: position,
                geography: terrainDistribution[Math.floor(Math.random() * terrainDistribution.length)],
                maxMeeples: Math.ceil(Math.random() * 10),
                topMeeple: topMeeple
            };
        }
    }

    const players: Player[] = new Array<Player>();
    let i: number = 0;
    meepleKey = 0;

    for (let color of colors) {

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
                color: color,
                turn: turns[0],
                strength: (30 / Math.ceil(Math.random() * 10)),
                resistance: (30 / Math.ceil(Math.random() * 10)),
                faith: (30 / Math.ceil(Math.random() * 10)),
                topsMeeple: -1
            };

            terrains[positionToIndex(position, boardSize)].topMeeple = meeple.key;
            meeples[meeple.key] = meeple;

            players[colors.indexOf(color)] = {
                color: color,
                individualActions: 0
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
