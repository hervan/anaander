import * as React from 'react';

import * as Game from '../Game';

import Status from './Status';
import Board from './Board';
import Controls from './Controls';

interface GameState { game: Game.Game };

export interface Props { game: Game.Game, move: (move: Game.Play) => void };

export class Table extends React.Component<{}, GameState> {
    
    state: GameState;
    
    constructor() {
        
        super();
        this.state = { game: Game.setup(0) };
    }
    
    move(move: Game.Play) {
        
        switch (move.state) {
            
            case 'setup':
                
                const change =
                    (move.action == 'up' && this.state.game.playerCount < 5 ? 1 : 0)
                    + (move.action == 'down' && this.state.game.playerCount > 0 ? -1 : 0);
                
                this.setState({ game: Game.setup(this.state.game.playerCount + change) });
                
                break;
            
            case 'play':
                
                this.setState({ game: Game.play(this.state.game, move) });
                
                break;
        }
    }
    
    render() {
        return (
            <div id="table">
                <Status game={this.state.game} move={this.move.bind(this)} />
                <Controls game={this.state.game} move={this.move.bind(this)} />
                <Board game={this.state.game} move={this.move.bind(this)} />
            </div>
        );
    }
}
