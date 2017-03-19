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

export type Play = {
    state: State;
    player: Color;
    from: Position | 'player';
    action: Direction | Action | null;
}

const InvalidPlays = {
    WrongColor: "move a meeple of your own color.",
    WrongTurnHeads: "move a meeple with heads up.",
    WrongTurnTails: "move a meeple with tails up.",
    EmptyTerrain: "choose a terrain with a meeple in it.",
    NoGameYet: "wait for a game to begin.",
    OutOfBoard: "keep your meeples inside the board.",
    NotYourTurn: "wait for your turn to begin.",
    None: ""
}

type InvalidPlay = {
    explanation: string;
}

export type Game = {
    playerCount: number;
    boardSize: number;
    players: Player[];
    terrains: Terrain[];
    meeples: Meeple[];
    turn: Turn;
    currentPlayer: Color;
    state: State;
    lastAction: Direction | Action | InvalidPlay;
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

    console.log(game.terrains.map((terrain) =>
        terrain.meeples.length == 0 ? ' ' : colors[terrain.meeples[terrain.meeples.length - 1].color]));
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

function position_to_index(position: Position, boardSize: number): number {

    return (position.row * boardSize + position.col);
}

function index_to_position(index: number, boardSize: number): Position {

    return {
        row: Math.floor(index / boardSize),
        col: index % boardSize
    };
}

function moveMeeple(game: Game, from: Position, action: Direction | Action): Game {
    
    let lastAction: Direction | Action | InvalidPlay | null = null;
    let to = {
        row: from.row,
        col: from.col
    };
    
    let turn = game.turn;
    let currentPlayer = game.currentPlayer;
    
    const meeple = game.terrains[position_to_index(from, game.boardSize)].meeples.slice().pop();

    if (meeple == null) {
        
        lastAction = { explanation: InvalidPlays.EmptyTerrain };
    }
    else if ((meeple.color as Color) != game.currentPlayer) {
        
        lastAction = { explanation: InvalidPlays.WrongColor };
    }
    else if (meeple.turn != game.turn) {
        
        lastAction = { explanation:
            (game.turn == 'heads' ?
                InvalidPlays.WrongTurnHeads :
                InvalidPlays.WrongTurnTails) };
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
            
            lastAction = { explanation: InvalidPlays.OutOfBoard };
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
            
            const terrainMeeplesFrom = gameTerrains[position_to_index(from, game.boardSize)].meeples.slice();
            terrainMeeplesFrom.pop();
            gameTerrains[position_to_index(from, game.boardSize)].meeples = terrainMeeplesFrom;
            
            const terrainMeeplesTo = gameTerrains[position_to_index(to, game.boardSize)].meeples.slice();
            terrainMeeplesTo.push(meeple);
            gameTerrains[position_to_index(to, game.boardSize)].meeples = terrainMeeplesTo;
            
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

export function play(game: Game, play: Play): Game {
    
    if (play.state != 'play') {
        
        return {
            playerCount: game.playerCount,
            boardSize: game.boardSize,
            players: game.players.slice(),
            terrains: game.terrains.slice(),
            meeples: game.meeples.slice(),
            turn: game.turn,
            currentPlayer: game.currentPlayer,
            state: game.state,
            lastAction: { explanation: InvalidPlays.NoGameYet }
        };
    }
    else if (game.currentPlayer != play.player) {

        return {
            playerCount: game.playerCount,
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
        
        case 'default':
            
            return {
                playerCount: game.playerCount,
                boardSize: game.boardSize,
                players: game.players.slice(),
                terrains: game.terrains.slice(),
                meeples: game.meeples.slice(),
                turn: game.turn,
                currentPlayer: colors[0],
                state: play.state,
                lastAction: { explanation: InvalidPlays.None }
            };
            
        default:
            
            let iGame: Game;
            let next_player: Color;
            let turn: Turn;

            switch (play.from) {
                
                case 'player':
                    
                    iGame = moveSwarm(game, play.action as Direction | Action);
                    next_player = nextPlayer(iGame);
                    turn = nextTurn(iGame);
                    
                    break;
                
                default:
                    
                    iGame = moveMeeple(game, play.from as Position, play.action as Direction | Action);
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
    
    const terrains = new Array<Terrain>();
    const gameMeeples = new Array<Meeple>();
    
    for (let i = 0; i < boardSize; i++) {
        
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
            
            terrains.push({
                position: { row: i, col: j },
                geography: terrainDistribution[Math.floor(Math.random() * 14)],
                maxMeeples: Math.ceil(Math.random() * 10),
                meeples: terrainMeeples
            });
        }
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
            } while (terrains[position_to_index(position, boardSize)].meeples.length > 0);

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
            const terrainMeeples = terrains[position_to_index(position, boardSize)].meeples.slice();
            terrainMeeples.push(meeple);
            terrains[position_to_index(position, boardSize)].meeples = terrainMeeples;
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
        lastAction: { explanation: InvalidPlays.None }
    };
    
    return game;
}
