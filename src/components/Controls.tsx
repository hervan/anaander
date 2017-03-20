// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { IProps } from "./Table";

import Player from "./Player";

export default (props: IProps) =>
    <section id="players" className="section">
        <div className="container">
            <div className="columns">
                {props.game.players.map((player) =>
                    <Player
                        key={player.color}
                        player={player}
                        moveClick={props.moveClick}
                        active={player.color === props.game.currentPlayer}
                    />
                )}
            </div>
        </div>
    </section>;
