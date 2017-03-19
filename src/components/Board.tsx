// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import { IProps } from "./Table";

import Terrain from "./Terrain";
import Meeple from "./Meeple";

export default (props: IProps) =>
    <section id="board" className="section">
        <div className="container">
            <div key="terrains" className="board">
                {props.game.terrains.map((terrain) =>
                    <Terrain
                        key={"row" + terrain.position.row + "col" + terrain.position.col}
                        terrain={terrain}
                        move={props.move}
                    />
                )}
            </div>
            <div key="meeples" className="board">
                {props.game.meeples.map((meeple) => <Meeple key={meeple.key} meeple={meeple} />)}
            </div>
        </div>
    </section>;
