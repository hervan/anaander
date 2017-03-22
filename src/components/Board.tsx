// tslint:disable-next-line:no-unused-variable
import * as React from "react";

import { meeplesBelow } from "../Game";
import { IProps } from "./Table";

import Terrain from "./Terrain";
import Meeple from "./Meeple";

const translation =
[
    [{row: 0, col: 0}],
    [{row: -11, col: -11}, {row: 11, col: 11}],
    [{row: -15, col: -15}, {row: 0, col: 0}, {row: 15, col: 15}],
    [{row: -11, col: -11}, {row: -11, col: 11}, {row: 11, col: -11}, {row: 11, col: 11}],
    [{row: -15, col: -15}, {row: -15, col: 15}, {row: 0, col: 0}, {row: 15, col: -15}, {row: 15, col: 15}],
    [{row: -15, col: -15}, {row: -15, col: 15}, {row: 0, col: -15}, {row: 0, col: 15}, {row: 15, col: -15}, {row: 15, col: 15}]
];

export default (props: IProps) =>
    <div id="board" className="container tile is-5 is-parent">
        <div className="tile is-child">
            <div key="terrains" className="board">
                {props.game.terrains.map((terrain) =>
                    <Terrain
                        key={"row" + terrain.position.row + "col" + terrain.position.col}
                        terrain={terrain}
                        moveClick={props.moveClick}
                    />
                )}
            </div>
            <div key="meeples" className="board">
                {props.game.terrains
                    .filter((terrain) => terrain.topMeeple !== -1)
                    .map((terrain) => meeplesBelow(props.game, terrain.topMeeple, []))
                    .map((meeples) =>
                        meeples.map((meeple, pos) =>
                            <Meeple
                                key={meeple.key}
                                meeple={meeple}
                                translation={translation[meeples.length - 1][pos]}
                                scale={1/meeples.length} />
                        ))}
            </div>
        </div>
    </div>;
