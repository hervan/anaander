import * as React from 'react';
import { Props } from './Table';

import Player from './Player';

export default (props: Props) =>
    <section id="players" className="section">
        <div className="container">
            <div className="columns">
                {props.game.players.map((player) =>
                    <Player
                        key={player.color}
                        player={player}
                        move={props.move}
                        active={player.color == props.game.currentPlayer}
                    />
                )}
            </div>
        </div>
    </section>;
