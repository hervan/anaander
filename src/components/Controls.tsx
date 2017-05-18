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
                    .filter((meeple) => meeple.key !== -1 && meeple.team === player.team)
                    .map((meeple) => ({
                        meeple: meeple,
                        terrain: props.game.terrains[positionToIndex(meeple.position, props.game.boardSize)]
                    }))}
                empire={player.cities
                    .map((cityKey) => props.game.terrains[cityKey])
                    .filter(({construction}) => construction.type === "city")
                    .map((terrain) => ({ city: terrain.construction as City, spaceLeft: terrain.spaceLeft }))
                    .concat(
                        props.game.meeples
                            .filter((meeple) => meeple.key !== -1
                                && meeple.team === player.team
                                && meeple.topsMeeple === -1)
                            .map((meeple) => props.game
                                .terrains[positionToIndex(meeple.position, props.game.boardSize)])
                            .filter(({construction}) =>
                                construction.type === "city"
                                && construction.team !== player.team
                                && player.cities.every((cityKey) => cityKey !== construction.key))
                            .map((terrain) => ({ city: terrain.construction as City, spaceLeft: terrain.spaceLeft }))
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
