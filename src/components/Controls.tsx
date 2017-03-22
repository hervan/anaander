// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { IProps } from "./Table";

import Player from "./Player";

export default (props: IProps) =>
    <div id="players" className="tile is-2 is-vertical">
        {props.game.players.map((player) =>
            <Player
                key={player.team}
                player={player}
                moveClick={props.moveClick}
                active={player.team === props.game.currentPlayer}
            />
        )}
    </div>;
