export type Color =
| 'primary'
| 'info'
| 'success'
| 'warning'
| 'danger'
| 'default';

const colors: Color[] = ['info', 'warning', 'success', 'danger', 'primary', 'default'];

type Direction =
| 'up'
| 'left'
| 'down'
| 'right';

type Position = {
    row: number;
    col: number;
}

export type Geography =
| 'city'
| 'island'
| 'forest'
| 'swamp'
| 'mountain'
| 'plains';

const terrainDistribution: Geography[] = [
    'city',                 // not very frequent
    'island', 'island',     // twice the frequency
    'forest', 'forest',     // twice the frequency
    'swamp', 'swamp',       // twice the frequency
    'mountain', 'mountain', // twice the frequency
    'plains', 'plains', 'plains', 'plains' // way more frequent
];

type Item =
| 'relic'
| 'technology'
| 'mineral'
| 'food'
| 'water';

type Turn =
| 'heads'
| 'tails';

const turns: Turn[] = ['heads', 'tails'];

type State =
| 'setup'
| 'play'
| 'end';

type Action =
| 'attack'
| 'guard'
| 'explore'
| 'convert'
| 'skip';

export type Meeple = {
    key: number;
    position: Position;
    color: Color;
    turn: Turn;
    strength: number;
    faith: number;
}

export type Terrain = {
    position: Position;
    geography: Geography;
    maxMeeples: number;
    meeples: Meeple[];
    //hiddenItems: Item[];
}

export type Player = {
    color: Color;
    meeples: Meeple[];
    individualActions: number;
    //items: Item[];
}

export type Move = {
    state: State;
    player: Color;
    from: Position | 'player';
    action: Direction | Action | null;
}

const InvalidMoves = {
    WrongColor: "move a meeple of your own color.",
    WrongTurnHeads: "move a meeple with heads up.",
    WrongTurnTails: "move a meeple with tails up.",
    EmptyTerrain: "choose a terrain with a meeple in it.",
    NoGameYet: "wait for a game to begin.",
    OutOfBoard: "keep your meeples inside the board.",
    None: ""
}

type InvalidMove = {
    explanation: string;
}

export type Game = {
    playerCount: number;
    boardSize: number;
    players: Player[];
    terrains: Terrain[][];
    meeples: Meeple[];
    turn: Turn;
    currentPlayer: Color;
    state: State;
    lastAction: Direction | Action | InvalidMove;
}

export function log_board(game: Game) {
    
    let colors = {
        'info': '1',
        'warning': '2',
        'success': '3',
        'danger': '4',
        'primary': '5',
        'default': 'o'
    };

    console.log(game.terrains.map((row) =>
        row.map((terrain) =>
        terrain.meeples.length == 0 ? ' ' : colors[terrain.meeples[terrain.meeples.length - 1].color])));
}

function nextPlayer(game: Game): Color {
    
    return colors[(colors.indexOf(game.currentPlayer) + 1) % game.playerCount];
}

function flipTurn(turn: Turn): Turn {
    
    switch (turn) {
        
        case 'heads':
            return 'tails';
        
        case 'tails':
            return 'heads';
    }
}

function nextTurn(game: Game): Turn {
    
    return colors.indexOf(nextPlayer(game)) == 0 ?
        flipTurn(game.turn) :
        game.turn;
}

function moveMeeple(game: Game, from: Position, action: Direction | Action): Game {
    
    let lastAction: Direction | Action | InvalidMove | null = null;
    let to = {
        row: from.row,
        col: from.col
    };
    
    let turn = game.turn;
    let currentPlayer = game.currentPlayer;
    
    const meeple = game.terrains[from.row][from.col].meeples.slice().pop();

    if (meeple == null) {
        
        lastAction = { explanation: InvalidMoves.EmptyTerrain };
    }
    else if ((meeple.color as Color) != game.currentPlayer) {
        
        lastAction = { explanation: InvalidMoves.WrongColor };
    }
    else if (meeple.turn != game.turn) {
        
        lastAction = { explanation:
            (game.turn == 'heads' ?
                InvalidMoves.WrongTurnHeads :
                InvalidMoves.WrongTurnTails) };
    }
    else {
        
        switch (action) {
            
            case 'left':
                to.col = from.col - 1;
                break;
            
            case 'right':
                to.col = from.col + 1;
                break;
            
            case 'up':
                to.row = from.row - 1;
                break;
            
            case 'down':
                to.row = from.row + 1;
                break;
            
            default:
                lastAction = null;
        }
        
        if (to.row < 0
          || to.row >= game.boardSize
          || to.col < 0
          || to.col >= game.boardSize) {
            
            lastAction = { explanation: InvalidMoves.OutOfBoard };
        }
        
        if (lastAction == null) {
            
            const player = game.players.slice()[colors.indexOf(game.currentPlayer)];
            
            meeple.turn = flipTurn(meeple.turn);
            
            const playerMeeples = player.meeples.slice().filter((iMeeple) => meeple.key != iMeeple.key);
            playerMeeples.push(meeple);
            player.meeples = playerMeeples;
            
            const gamePlayers = game.players.slice();
            gamePlayers[colors.indexOf(player.color)] = player;
            game.players = gamePlayers;
            
            const gameTerrains = game.terrains.slice();
            
            const terrainMeeplesFrom = gameTerrains[from.row][from.col].meeples.slice();
            terrainMeeplesFrom.pop();
            gameTerrains[from.row][from.col].meeples = terrainMeeplesFrom;
            
            const terrainMeeplesTo = gameTerrains[to.row][to.col].meeples.slice();
            terrainMeeplesTo.push(meeple);
            gameTerrains[to.row][to.col].meeples = terrainMeeplesTo;
            
            game.terrains = gameTerrains;
            
            game.meeples = game.meeples.slice().filter((iMeeple) => meeple.key != iMeeple.key);
            game.meeples.push(meeple);
            
            lastAction = action;
        }
    }
    
    return {
        playerCount: game.playerCount,
        boardSize: game.boardSize,
        players: game.players,
        terrains: game.terrains,
        meeples: game.meeples,
        turn: turn,
        currentPlayer: currentPlayer,
        state: game.state,
        lastAction: lastAction
    };
}

function moveSwarm(game: Game, action: Direction | Action): Game {
    
    const playerMeeples = game.players[colors.indexOf(game.currentPlayer)].meeples.slice();
    
    let game_step = playerMeeples.reduce((acc, meeple) => moveMeeple(acc, meeple.position, action), game);

    return game_step;
}

export function move(game: Game, move: Move): Game {
    
    if (move.state != 'play') {
        
        return {
            playerCount: game.playerCount,
            boardSize: game.boardSize,
            players: game.players.slice(),
            terrains: game.terrains.slice(),
            meeples: game.meeples.slice(),
            turn: game.turn,
            currentPlayer: game.currentPlayer,
            state: game.state,
            lastAction: { explanation: InvalidMoves.NoGameYet }
        };
    }
    
    switch (move.player) {
        
        case 'default':
            return {
                playerCount: game.playerCount,
                boardSize: game.boardSize,
                players: game.players.slice(),
                terrains: game.terrains.slice(),
                meeples: game.meeples.slice(),
                turn: game.turn,
                currentPlayer: colors[0],
                state: move.state,
                lastAction: { explanation: InvalidMoves.None }
            };
            
        default:
            
            let iGame: Game;
            let next_player: Color;
            let turn: Turn;

            switch (move.from) {
                
                case 'player':
                    
                    iGame = moveSwarm(game, move.action as Direction | Action);
                    next_player = nextPlayer(iGame);
                    turn = nextTurn(iGame);
                    
                    break;
                
                default:
                    
                    iGame = moveMeeple(game, move.from as Position, move.action as Direction | Action);
                    next_player = nextPlayer(iGame);
                    turn = iGame.turn;

                    break;
            }
            
            return {
                
                playerCount: iGame.playerCount,
                boardSize: iGame.boardSize,
                players: iGame.players.slice(),
                terrains: iGame.terrains.slice(),
                meeples: iGame.meeples.slice(),
                turn: turn,
                currentPlayer: next_player,
                state: iGame.state,
                lastAction: iGame.lastAction
            };
    }
}

export function setup(playerCount: number, boardSize: number = 16): Game {
    
    let meepleKey = playerCount;
    
    const terrains = new Array<Array<Terrain>>();
    const gameMeeples = new Array<Meeple>();
    
    for (let i = 0; i < boardSize; i++) {
        
        const row = new Array<Terrain>();
        
        for (let j = 0; j < boardSize; j++) {
            
            const terrainMeeples = Array<Meeple>();
            if (Math.random() < 0.1) {
                
                const meeple: Meeple = {
                    key: ++meepleKey,
                    position: { row: i, col: j },
                    color: 'default',
                    turn: 'heads',
                    strength: (10 / Math.ceil(Math.random() * 10)),
                    faith: (10 / Math.ceil(Math.random() * 10))
                };
                terrainMeeples.push(meeple);
                gameMeeples.push(meeple);
            }
            
            row.push({
                position: { row: i, col: j },
                geography: terrainDistribution[Math.floor(Math.random() * 14)],
                maxMeeples: Math.ceil(Math.random() * 10),
                meeples: terrainMeeples
            });
        }
        
        terrains.push(row);
    }

    const players = new Array<Player>();
    let i = 0;
    meepleKey = 0;
    
    for (let color of colors) {
        
        if (i < playerCount) {
            
            let position: Position;
            do {
                position = {
                    row: Math.floor(Math.random() * (boardSize - 2)) + 1,
                    col: Math.floor(Math.random() * (boardSize - 2)) + 1
                };
            } while (terrains[position.row][position.col].meeples.length > 0);

            const playerMeeples = new Array<Meeple>();
            const meeple: Meeple = {
                key: meepleKey++,
                position: position,
                color: color,
                turn: 'heads',
                strength: (30 / Math.ceil(Math.random() * 30)),
                faith: (30 / Math.ceil(Math.random() * 30))
            };
            
            playerMeeples.push(meeple);
            const terrainMeeples = terrains[meeple.position.row][meeple.position.col].meeples.slice();
            terrainMeeples.push(meeple);
            terrains[meeple.position.row][meeple.position.col].meeples = terrainMeeples;
            gameMeeples.push(meeple);
            
            players[colors.indexOf(color)] = {
                color: color,
                meeples: playerMeeples,
                individualActions: 0
            };
            
            i++;
        }
    }
    
    const game: Game = {
        playerCount: playerCount,
        boardSize: boardSize,
        players: players,
        terrains: terrains,
        meeples: gameMeeples,
        turn: 'heads',
        currentPlayer: 'default',
        state: 'setup',
        lastAction: { explanation: InvalidMoves.None }
    };
    
    return game;
}
