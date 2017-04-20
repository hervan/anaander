// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { IProps } from "./Table";

import Player from "./Player";

const Controls: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div id="players" className="tile is-2 is-vertical">
        {props.game.players.map((player) =>
            <Player
                key={player.team}
                player={player}
                enqueuePlay={props.enqueuePlay}
                active={player.team === props.game.currentTeam}
            />
        )}
    </div>;

export default Controls;
