// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { Meeple as MeepleType, meeplesBelow } from "../Game";

import { IProps } from "./Table";

import Meeple from "./Meeple";
import Terrain from "./Terrain";

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
    <div id="board" className="tile is-parent">
        <div className="tile is-child">
            <div key="terrains" className="board">
                {props.game.terrains.map((terrain) =>
                    <Terrain
                        key={"row" + terrain.position.row + "col" + terrain.position.col}
                        terrain={terrain}
                        enqueuePlay={props.enqueuePlay}
                    />
                )}
            </div>
            <div key="meeples" className="board">
                {props.game.terrains
                    .filter((terrain) => terrain.topMeeple !== -1)
                    .map((terrain) => meeplesBelow(props.game, terrain.topMeeple, []))
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
                            scale={1.4 - (meeple.l  / 7)}
                        />
                    )}
            </div>
        </div>
    </div>;

export default Board;
