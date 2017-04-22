// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    Game,
    Item,
    Play,
    Position,
    Team,
    Turn
} from "../Game";

import {
    Control,
    SelectMode
} from "Table";

import Player from "./Player";

interface IProps {
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position, item?: Item) => void;
    game: Game;
    selection: Position[];
    selectMode: SelectMode;
    item: Item;
};

const Controls: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div id="players" className="tile is-2 is-vertical">
        {props.game.players.map((player) =>
            <Player
                key={player.team}
                player={player}
                setup={props.setup}
                enqueuePlay={props.enqueuePlay}
                active={player.team === props.game.currentTeam}
                selectMode={props.selectMode}
                item={props.item}
            />
        )}
    </div>;

export default Controls;
