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
    <div className="tile is-ancestor is-vertical">
        {props.game.players
            .sort((a, b) =>
                ((a.team < props.game.currentTeam ? 100 : 1) * (a.team + 1))
                - ((b.team < props.game.currentTeam ? 100 : 1) * (b.team + 1)))
            .map((player) =>
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
