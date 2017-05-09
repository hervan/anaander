// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    City,
    Game,
    Meeple,
    Play,
    Position,
    positionToIndex,
    Side,
    Team
} from "../Game";

import { Control } from "Table";

import Player from "./Player";

interface IProps {
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    select: (position: Position) => void;
    selection: number[];
    game: Game;
};

const Controls: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div>
        {props.game.players.filter((player) => player.team >= props.game.turn.team)
            .concat(props.game.players.filter((player) => player.team < props.game.turn.team))
            .map((player) =>
            <Player
                key={player.team}
                player={player}
                swarm={props.game.meeples
                    .filter((meeple) => meeple.key !== -1 && meeple.team === player.team)}
                empire={player.cities
                    .map((cityKey) => props.game.terrains[cityKey].construction as City)
                    .filter((city) => city.type === "city")
                    .concat(
                        props.game.meeples
                            .filter((meeple) => meeple.key !== -1
                                && meeple.team === player.team
                                && meeple.topsMeeple === -1)
                            .map((meeple) => props.game
                                .terrains[positionToIndex(meeple.position, props.game.boardSize)]
                                .construction as City)
                            .filter((city) => city.type === "city" && city.team !== player.team)
                    )}
                setup={props.setup}
                enqueuePlay={props.enqueuePlay}
                select={props.select}
                selection={props.selection}
                active={player.team === props.game.turn.team}
            />
        )}
    </div>;

export default Controls;
