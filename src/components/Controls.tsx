// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    Game,
    Item,
    Play,
    PlayType,
    Position,
    Side,
    Team
} from "../Game";

import { Control } from "Table";

import Player from "./Player";

interface IProps {
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position, item?: Item) => void;
    game: Game;
    selection: Position[];
    playType: PlayType;
    item: Item;
};

const Controls: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div className="tile is-ancestor is-vertical">
        {props.game.players.filter((player) => player.team >= props.game.turn.team)
            .concat(props.game.players.filter((player) => player.team < props.game.turn.team))
            .map((player) =>
            <Player
                key={player.team}
                player={player}
                setup={props.setup}
                enqueuePlay={props.enqueuePlay}
                active={player.team === props.game.turn.team}
                playType={props.playType}
                item={props.item}
            />
        )}
    </div>;

export default Controls;
