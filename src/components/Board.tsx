// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { IProps } from "./Table";

import Terrain from "./Terrain";
import Meeple from "./Meeple";

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
                {props.game.meeples.map((meeple) => <Meeple key={meeple.key} meeple={meeple} />)}
            </div>
        </div>
    </div>;
