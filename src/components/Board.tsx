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

import { Control, Zoom } from "Table";

interface IProps {
    setup: (control: Control) => void;
    enqueuePlay: (team: Team, action: Action) => void;
    game: Game;
    select: (position: Position) => void;
    selection: number[];
    zoom: Zoom;
};

const translation: Array<Array<{ row: number, col: number }>> =
[
    [{row: 0, col: 0}],
    [{row: -1, col: -1}, {row: 1, col: 1}],
    [{row: -1, col: -1}, {row: 0, col: 0}, {row: 1, col: 1}],
    [{row: -1, col: -1}, {row: -1, col: 1}, {row: 1, col: -1}, {row: 1, col: 1}],
    [{row: -1, col: -1}, {row: -1, col: 1}, {row: 0, col: 0}, {row: 1, col: -1}, {row: 1, col: 1}],
    [{row: -1, col: -1}, {row: -1, col: 1}, {row: 0, col: -1}, {row: 0, col: 1}, {row: 1, col: -1}, {row: 1, col: 1}]
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
            transformOrigin: `${(props.zoom.position.col + 0.5) * 95 / props.game.boardSize}vmin`
                + ` ${(props.zoom.position.row + 0.5) * 95 / props.game.boardSize}vmin`,
            transform: `scale(${props.game.boardSize / props.zoom.scale})`
        }}>
            <div key="terrains" className="board">
                {props.game.terrains.map((terrain) =>
                    <Terrain
                        key={"row" + terrain.position.row + "col" + terrain.position.col}
                        terrain={terrain}
                        size={95 / props.game.boardSize}
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
                            scale={1 - ((meeple.l - 1) / 6)}
                            size={95 / props.game.boardSize}
                            select={props.select}
                        />
                    )}
            </div>
        </div>
    </div>;

export default Board;
