// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import {
    Action,
    Game,
    Geography,
    GeographyInfo,
    Meeple as MeepleType,
    meeplesBelow,
    Position,
    Team
} from "../Game";

import Meeple from "./Meeple";
import Terrain from "./Terrain";

import { Control } from "Table";

interface IProps {
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    game: Game;
    select: (position: Position) => void;
    selection: number[];
    zoom: number;
};

const translation: Array<Array<{ row: number, col: number }>> =
[
    [{row: 0, col: 0}],
    [{row: -9, col: -9}, {row: 9, col: 9}],
    [{row: -13, col: -13}, {row: 0, col: 0}, {row: 13, col: 13}],
    [{row: -10, col: -10}, {row: -10, col: 10}, {row: 10, col: -10}, {row: 10, col: 10}],
    [{row: -14, col: -14}, {row: -14, col: 14}, {row: 0, col: 0}, {row: 14, col: -14}, {row: 14, col: 14}],
    [{row: -14, col: -14}, {row: -14, col: 14}, {row: 0, col: -14}, {row: 0, col: 14}, {row: 14, col: -14},
        {row: 14, col: 14}]
];

const Board: ((props: IProps) => JSX.Element) = (props: IProps) =>
    <div style={{
        display: "inline-block",
        margin: "2vmin",
        width: "95vmin",
        height: "95vmin",
        overflow: "hidden"
    }}>
        <div id="board" style={{
            transformOrigin: props.selection.length > 0 ?
                `${props.game.meeples[props.selection[0]].position.row * 43}px
                ${props.game.meeples[props.selection[0]].position.col * 43}px` :
                `${props.game.terrains[Math.floor(props.game.boardSize ** 2 / 2)].position.row}px
                ${props.game.terrains[Math.floor(props.game.boardSize ** 2 / 2)].position.col}px`,
            transform: `scale(${16 / props.zoom}, ${16 / props.zoom})` }}>
            <div key="terrains" className="board">
                {props.game.terrains.map((terrain) =>
                    <Terrain
                        key={"row" + terrain.position.row + "col" + terrain.position.col}
                        terrain={terrain}
                        selected={props.selection.some((mi) => mi === terrain.topMeeple)}
                        enqueuePlay={props.enqueuePlay}
                        select={props.select}
                    />
                )}
            </div>
            <div key="meeples" className="board">
                {props.game.terrains
                    .filter((terrain) => terrain.topMeeple !== -1)
                    .map((terrain) => meeplesBelow(props.game, terrain.topMeeple))
                    .reduce((acc, meeples) => [
                        ...acc,
                        ...meeples.map((meeple, index) => ({ m: meeple, p: index, l: meeples.length }))
                    ], new Array<{ m: MeepleType, p: number, l: number }>())
                    .sort((a, b) => a.m.key - b.m.key)
                    .map((meeple) =>
                        <Meeple
                            key={meeple.m.key}
                            meeple={meeple.m}
                            translation={translation[meeple.l - 1][meeple.p]}
                            scale={1.4 - (meeple.l / 7)}
                            select={props.select}
                        />
                    )}
            </div>
        </div>
    </div>;

export default Board;
